
async function getMenus() {
    try {
        const response = await fetch('http://localhost:8080/menu/menus');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getMenu(menuId) {
    return fetch('http://localhost:8080/menu/' + menuId)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error(error);
            return null;
        });
}

function createMenuItem(item, index) {
    return `
  <div id="menu-item-${item.id}" class="menu-item bg-gray-200 flex flex-row justify-between max-w-6xl sm:max-w-md">
      <div class="order-number mr-4">${index + 1}. </div>
      <div class="menu-item-main flex-grow">
          <p class="menu-item-title font-bold">${item.name}</p>
          <p class="menu-item-description">${item.description}</p>
      </div>
      <span class="menu-item-price ml-4">${item.price},-</span>
      <button class="delete-item-btn" data-menu-id="${item.menuId}" data-index="${index}">Delete</button>
  </div>
`;
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        let menusData = await getMenus();
        const menuItems = document.querySelector('#menu-items');
        const menuName = document.querySelector('#menu-name');
        const addItemForm = document.querySelector('#add-item-form');
        const addItemModal = document.querySelector('#add-item-modal');
        const menuDropdown = document.querySelector('#menu-dropdown'); // Added menu dropdown element

        let selectedMenuId = null; // Variable to store the selected menu ID
        menuDropdown.addEventListener('change', function (event) {
            selectedMenuId = parseInt(event.target.value, 10);
        });

// Function to populate the menu dropdown
        function populateMenuDropdown(menusData) {
            const menuDropdown = document.querySelector('#menu-dropdown');
            menuDropdown.innerHTML = '<option value="">Select a menu</option>'; // Add an empty option as the default selection

            menusData.forEach(menu => {
                const option = document.createElement('option');
                option.value = menu.id;
                option.text = menu.name;
                menuDropdown.appendChild(option);
            });
        }

        function handleMenuDropdownChange() {
            selectedMenuId = parseInt(menuDropdown.value, 10);
        }

        function resetAddItemForm() {
            addItemForm.reset();
            selectedMenuId = null; // Reset the selected menu ID
        }

        function openAddItemModal() {
            addItemModal.classList.remove('hidden');
        }

        function closeAddItemModal() {
            addItemModal.classList.add('hidden');
        }
        async function handleAddItemFormSubmit(event) {
            event.preventDefault();
            const name = document.querySelector('#item-name').value;
            const description = document.querySelector('#item-description').value;
            const price = document.querySelector('#item-price').value;

            const selectedMenuId = parseInt(menuDropdown.value, 10); // Get the selected menu ID

            if (!selectedMenuId) {
                alert('Please select a menu before adding an item.');
                return;
            }

            const newItem = {
                name: name,
                description: description,
                price: price,
            };

            try {
                const menusData = await getMenus(); // Fetch the menusData to ensure it's up to date
                const selectedMenu = menusData.find((menuData) => menuData.id === selectedMenuId);
                if (selectedMenu) {
                    const response = await postMenuItem(selectedMenuId, newItem, menusData); // Pass the selected menu ID, new item, and menusData
                    if (response) {
                        selectedMenu.menuItems.push(newItem);
                        const menuItemsContainer = document.querySelector(`#menu-items-${selectedMenuId}`);
                        const menuItem = createMenuItem(newItem, selectedMenu.menuItems.length - 1);
                        menuItemsContainer.innerHTML += menuItem;
                        closeAddItemModal();
                        resetAddItemForm();
                    } else {
                        throw new Error('An error occurred while posting the menu item.');
                    }
                } else {
                    throw new Error(`Menu not found with ID: ${selectedMenuId}`);
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while posting the menu item. Please try again.');
            }
        }


        menusData.forEach(menuData => {
            const menuId = menuData.id;
            const menuTitle = menuData.name;

            // Create menu container
            const menuContainer = document.createElement('div');
            menuContainer.classList.add('menu-container');
            menuContainer.innerHTML = `
  <h2 class="menu-title">${menuTitle}</h2>
  <div id="menu-items-${menuId}" class="menu-items"></div>
`;
            menuItems.appendChild(menuContainer);

            const menuItemsContainer = document.querySelector(`#menu-items-${menuId}`);

            // Add menu items
            menuData.menuItems.forEach((item, index) => {
                const menuItem = createMenuItem(item, index);
                menuItemsContainer.innerHTML += menuItem;
            });
        });

        document.querySelectorAll('.delete-item-btn').forEach(deleteButton => {
            deleteButton.addEventListener('click', async (event) => {
                const menuItemId = parseInt(event.target.dataset.menuItemId, 10);

                try {
                    await deleteMenuItem(menuItemId);

                    // Perform any necessary UI updates after successful deletion
                    event.target.parentElement.remove();
                } catch (error) {
                    console.error(error);
                    alert("An error occurred while deleting the menu item. Please try again.");
                }
            });
        });

        populateMenuDropdown(menusData);

        addItemForm.addEventListener('submit', handleAddItemFormSubmit);
        document.querySelector('#add-item-btn').addEventListener('click', openAddItemModal);
        document.querySelector('#close-modal-btn').addEventListener('click', closeAddItemModal);

    } catch (error) {
        console.log(error);
    }
});

window.onload = async function () {
    try {
        let menuData = await getMenus();
        const menuItems = document.querySelector('#menu-items');
        const menuName = document.querySelector('#menu-name');

        menuData.menuItems.forEach((item, index) => {
            const menuItem = `
        <div id="menu-item-${item.id}" class="menu-item bg-gray-200 flex flex-row justify-between max-w-6xl sm:max-w-md">
          <div class="order-number mr-4">${index + 1}. </div>
          <div class="menu-item-main flex-grow">
              <p class="menu-item-title font-bold">${item.name}</p>
            <p class="menu-item-description">${item.description}</p>
          </div>
          <span class="menu-item-price ml-4">${item.price},-</span>
        </div>
`;
            menuItems.innerHTML += menuItem;
        });

        menuName.innerHTML = menuData.name;

        new Sortable(menuItems, {
            animation: 150,
            handle: ".menu-item",
            onEnd: function () {
                const newOrder = [];
                Array.from(menuItems.children).forEach((child, index) => {
                    const orderNumber = child.querySelector('.order-number');
                    orderNumber.textContent = `${index + 1}. `;
                    const id = parseInt(child.id.replace('menu-item-', ''));
                    newOrder.push(menuData.menuItems.find(item => item.id === id));
                });
                menuData.menuItems = newOrder;
                updateMenu(menuData);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function postMenuItem(menuId, menuItem, menusData) {
    const menu = menusData.find((menuData) => menuData.id === menuId);
    if (!menu) {
        throw new Error(`Menu not found with ID: ${menuId}`);
    }

    const updatedMenuItems = menu.menuItems.map((item) => {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image ? { id: item.image.id } : null
        };
    });

    updatedMenuItems.push({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price
    });

    const payload = {
        menu: {
            id: menu.id,
            name: menu.name
        },
        menuItems: updatedMenuItems
    };

    try {
        const response = await fetch(`http://localhost:8080/menu/${menuId}/updateMenuAndItems`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Put menu item:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



async function deleteMenuItem(menuItemId) {
    try {
        const response = await fetch(`http://localhost:8080/menuItem/deleteMenuItem/${menuItemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Deleted menu item:", menuItemId);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateMenu(menuData) {
    try {
        const response = await fetch('http://localhost:8080/menuItem/updateMenuItems', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menuData.menuItems)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Updated menu data:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}