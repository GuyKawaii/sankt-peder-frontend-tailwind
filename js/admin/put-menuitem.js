const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/login.html";
}



fetch('http://localhost:8080/menuItem/menuItems')
    .then(response => response.json())
    .then(menuItems => {
        const menuItemSelect = document.getElementById('menuItemSelect');
        menuItemSelect.innerHTML = '<option value="">Select a menu item</option>';
        menuItems.forEach(menuItem => {
            const option = document.createElement('option');
            option.value = menuItem.id;
            option.textContent = menuItem.name;
            menuItemSelect.appendChild(option);
        });
    })
    .catch(error => console.log(error));
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

function populateForm() {
    const menuItemId = document.getElementById('menuItemSelect').value;
    if (menuItemId === '') {
        clearForm();
        return;
    }

    fetch(`http://localhost:8080/menuItem/${menuItemId}`)
        .then(response => response.json())
        .then(menuItem => {
            document.getElementById('itemId').value = menuItem.id;
            document.getElementById('name').value = menuItem.name;
            document.getElementById('description').value = menuItem.description;
            document.getElementById('price').value = menuItem.price;
        })
        .catch(error => console.log(error));
}

function clearForm() {
    document.getElementById('itemId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('menuSelect').value = '';
}
document.getElementById('menuItemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemId = document.getElementById('itemId').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const menuId = document.getElementById('menuSelect').value;

    const menuItem = {
        id: itemId,
        name: name,
        description: description,
        price: price,
        menus: [
            {
                id: menuId
            }
        ]
    };

    fetch(`http://localhost:8080/menuItem/menuItems/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(menuItem)
    })
        .then(response => response.json())
        .then(updatedMenuItem => {
            console.log('Menu item updated:', updatedMenuItem);
            clearForm();
            location.reload();
        })
        .catch(error => console.log(error));
});

document.getElementById('deleteButton').addEventListener('click', function() {
    const itemId = document.getElementById('itemId').value;

    fetch(`http://localhost:8080/menuItem/deleteMenus/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            console.log('Menu item deleted');
            clearForm();
            location.reload();
        })
        .catch(error => console.log(error));
});