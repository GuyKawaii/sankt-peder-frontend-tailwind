const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/frontend-tailwindcss/html/admin/login.html";
}


// Fetch menus and populate the dropdown menu
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

document.getElementById('menuForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var menuId = document.getElementById('menuSelect').value;
    var newName = document.getElementById('name').value;

    // Update menu
    if (menuId && newName) {
        var menu = {
            id: menuId,
            name: newName
        };

        // Make PUT request to update the menu
        fetch('http://localhost:8080/menu/' + menuId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(menu)
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Menu updated successfully!');
                    location.reload(); // Refresh the page
                } else {
                    throw new Error('Error updating menu');
                }
            })
            .catch(function(error) {
                console.log(error);
                alert('An error occurred while updating the menu');
            });
    }
});

document.getElementById('deleteBtn').addEventListener('click', function() {
    var menuId = document.getElementById('menuSelect').value;

    // Delete menu
    if (menuId) {
        // Make DELETE request to delete the menu
        fetch('http://localhost:8080/menu/' + menuId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            }
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Menu deleted successfully!');
                    location.reload(); // Refresh the page
                } else {
                    throw new Error('Error deleting menu');
                }
            })
            .catch(function(error) {
                console.log(error);
                alert('An error occurred while deleting the menu');
            });
    }
});
