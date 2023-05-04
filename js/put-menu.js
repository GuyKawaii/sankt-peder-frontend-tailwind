const updateMenuForm = document.getElementById('update-menu-form');
const menuSelect = document.getElementById('menu-select');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');

async function populateMenuSelect() {
    const response = await fetch('http://localhost:8080/menus');
    const menus = await response.json();


    while (menuSelect.firstChild) {
        menuSelect.removeChild(menuSelect.firstChild);
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select a menu';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    menuSelect.appendChild(defaultOption);

    menus.forEach(menu => {
        const option = document.createElement('option');
        option.value = menu.id;
        option.text = `${menu.name} (${menu.id})`;
        menuSelect.appendChild(option);
    });
}

populateMenuSelect();

menuSelect.addEventListener('change', async () => {
    const id = menuSelect.value;

    if (!id) {
        nameInput.value = '';
        descriptionInput.value = '';
        priceInput.value = '';
        return;
    }


    const response = await fetch(`http://localhost:8080/menus/${id}`);
    const menu = await response.json();
    nameInput.value = menu.name;
    descriptionInput.value = menu.description;
    priceInput.value = menu.price;
});

updateMenuForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = menuSelect.value;
    const name = nameInput.value;
    const description = descriptionInput.value;
    const price = priceInput.value;

    const menu = {
        name: name,
        description: description,
        price: price
    };

    const response = await fetch(`http://localhost:8080/menu/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    });

    if (response.ok) {
        alert('Menu updated successfully');
        populateMenuSelect();
    } else {
        alert('Failed to update menu');
    }
});

const deleteMenuButton = document.getElementById('delete-menu-button');
deleteMenuButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const id = menuSelect.value;

    if (!id) {
        alert('Please select a menu to delete');
        return;
    }

    const response = await fetch(`http://localhost:8080/menu/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Menu deleted successfully');
        populateMenuSelect();
    } else {
        alert('Failed to delete menu');
    }
});