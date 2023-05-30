const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/login.html";
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

document.getElementById('menuForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var menuId = document.getElementById('menuSelect').value;
    var newName = document.getElementById('name').value;

    if (menuId && newName) {
        var menu = {
            id: menuId,
            name: newName
        };

        fetch('http://localhost:8080/menu/' + menuId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(menu)
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Menu updated successfully!');
                    location.reload();
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

    if (menuId) {
        fetch('http://localhost:8080/menu/' + menuId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Menu deleted successfully!');
                    location.reload();
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
