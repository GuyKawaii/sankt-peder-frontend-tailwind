const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/frontend-tailwindcss/html/admin/login.html";
}

fetch('http://localhost:8080/menu/menus')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error fetching menus');
        }
    })
    .then(function(menus) {
        var menuSelect = document.getElementById('menuSelect');
        menus.forEach(function(menu) {
            var option = document.createElement('option');
            option.value = menu.id;
            option.textContent = menu.name;
            menuSelect.appendChild(option);
        });
    })
    .catch(function(error) {
        console.log(error);
        alert('An error occurred while fetching the menus');
    });

document.getElementById('menuItemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
    var menuId = document.getElementById('menuSelect').value;

    // Create payload object
    var payload = {
        name: name,
        description: description,
        price: price,
        menus: [
            { id: menuId }
        ]
    };

    // Make POST request to the server
    fetch('http://localhost:8080/menuItem/postMenuItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(payload)
    })
        .then(function(response) {
            if (response.ok) {
                alert('MenuItem created successfully!');
                location.reload(); // Refresh the page
            } else {
                throw new Error('Error creating menuItem');
            }
        })
        .catch(function(error) {
            console.log(error);
            alert('An error occurred while creating the menuItem');
        });
});
