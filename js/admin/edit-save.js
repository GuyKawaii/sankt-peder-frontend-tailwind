const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/frontend-tailwindcss/html/admin/login.html";
}


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

function createMenuItem(item, index) {
    const menuItem = document.createElement('div');
    menuItem.id = `menu-item-${item.id}`;
    menuItem.classList.add(
        'menu-item',
        'bg-gray-200',
        'flex',
        'flex-row',
        'justify-between',
        'max-w-6xl',
        'sm:max-w-md'
    );

    const orderNumber = document.createElement('div');
    orderNumber.classList.add('order-number', 'mr-4');
    orderNumber.textContent = `${index + 1}. `;
    menuItem.appendChild(orderNumber);

    const menuItemMain = document.createElement('div');
    menuItemMain.classList.add('menu-item-main', 'flex-grow');

    const menuItemTitle = document.createElement('p');
    menuItemTitle.classList.add('menu-item-title', 'font-bold');
    menuItemTitle.textContent = item.name;
    menuItemMain.appendChild(menuItemTitle);

    const menuItemDescription = document.createElement('p');
    menuItemDescription.classList.add('menu-item-description');
    menuItemDescription.textContent = item.description;
    menuItemMain.appendChild(menuItemDescription);

    menuItem.appendChild(menuItemMain);

    const menuItemPrice = document.createElement('span');
    menuItemPrice.classList.add('menu-item-price', 'ml-4');
    menuItemPrice.textContent = `${item.price},-`;
    menuItem.appendChild(menuItemPrice);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-item-btn');
    editButton.dataset.index = index;
    editButton.textContent = 'Edit';
    menuItem.appendChild(editButton);

    return menuItem;
}

async function updateMenuItem(item, itemId) {
    try {
        const response = await fetch(
            `http://localhost:8080/menuItem/menuItems/${itemId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify(item),
            }
        );

        if (response.ok) {
            const updatedItem = await response.json();
            console.log('Updated menu item:', updatedItem);
        } else {
            console.error('Failed to update menu item:', response.status);
        }
    } catch (error) {
        console.error('Error updating menu item:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        let menuData = await getMenus();
        const menuItemsContainer = document.querySelector('#menu-items');

        menuData.forEach((menu) => {
            const menuContainer = document.createElement('div');
            menuContainer.classList.add('menu-container');

            const menuHeader = document.createElement('h2');
            menuHeader.classList.add('menu-header');
            menuHeader.textContent = menu.name;
            menuHeader.dataset.menuId = menu.id;
            menuContainer.appendChild(menuHeader);

            const menuItemsGroup = document.createElement('div');
            menuItemsGroup.classList.add('menu-items-group');

            menu.menuItems.forEach((item, index) => {
                const menuItem = createMenuItem(item, index);
                menuItemsGroup.appendChild(menuItem);
            });

            menuContainer.appendChild(menuItemsGroup);
            menuItemsContainer.appendChild(menuContainer);
        });

        document.querySelector('#menu-items').addEventListener('click', (event) => {
            if (event.target.matches('button.edit-item-btn')) {
                const index = parseInt(event.target.dataset.index, 10);
                const menuItem = event.target.closest('.menu-item');
                const menuItemsContainer = menuItem.parentNode;
                const menuContainer = menuItemsContainer.parentNode;
                const menuHeader = menuContainer.querySelector('.menu-header');
                const menuId = parseInt(menuHeader.dataset.menuId, 10);

                const menuDataItem = menuData.find(menu => menu.id === menuId);
                if (!menuDataItem || !menuDataItem.hasOwnProperty('menuItems') || !Array.isArray(menuDataItem.menuItems)) {
                    console.error('Invalid menu data');
                    return;
                }

                const itemToEdit = menuDataItem.menuItems[index];
                if (!itemToEdit) {
                    console.error('Invalid item to edit');
                    return;
                }

                document.querySelector('#edit-item-name').value = itemToEdit.name;
                document.querySelector('#edit-item-description').value = itemToEdit.description;
                document.querySelector('#edit-item-price').value = itemToEdit.price;
                document.querySelector('#edit-item-modal').classList.remove('hidden');

                document.querySelector('#edit-item-form').onsubmit = function (event) {
                    event.preventDefault();
                    itemToEdit.name = document.querySelector('#edit-item-name').value;
                    itemToEdit.description = document.querySelector('#edit-item-description').value;
                    itemToEdit.price = document.querySelector('#edit-item-price').value;

                    const editedMenuItem = createMenuItem(itemToEdit, index);
                    menuItem.parentNode.replaceChild(editedMenuItem, menuItem);

                    document.querySelector('#edit-item-modal').classList.add('hidden');

                    updateMenuItem(itemToEdit, itemToEdit.id);
                };
                document.querySelector('#close-edit-modal-btn').addEventListener('click', () => {
                    document.querySelector('#edit-item-modal').classList.add('hidden');
                });
            }
        });

        new Sortable(menuItemsContainer, {
            animation: 150,
            handle: '.menu-item',
            onEnd: function (event) {
                const newOrder = [];
                const menuHeaders = menuItemsContainer.querySelectorAll('.menu-header');
                menuHeaders.forEach((menuHeader) => {
                    const menuId = parseInt(menuHeader.dataset.menuId, 10);
                    const menuDataItem = menuData.find(menu => menu.id === menuId);
                    if (!menuDataItem || !menuDataItem.hasOwnProperty('menuItems') || !Array.isArray(menuDataItem.menuItems)) {
                        console.error('Invalid menu data');
                        return;
                    }
                    const menuItemsArray = Array.from(menuItemsContainer.children);
                    const menuItemsData = menuItemsArray.reduce((items, itemElement) => {
                        const itemId = parseInt(itemElement.id.replace('menu-item-', ''), 10);
                        const menuItem = menuDataItem.menuItems.find((item) => item.id === itemId);
                        if (menuItem) {
                            items.push(menuItem);
                        }
                        return items;
                    }, []);

                    newOrder.push({
                        ...menuDataItem,
                        menuItems: menuItemsData,
                    });
                });

                menuData = newOrder;
                updateMenuItemOrder(newOrder);
            },
        });

        async function updateMenuItemOrder(menuData) {
            try {
                const response = await fetch('http://localhost:8080/menu/updateMenus', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    body: JSON.stringify(menuData),
                });

                if (response.ok) {
                    const updatedData = await response.json();
                    console.log('Updated menu data:', updatedData);
                    location.reload();
                } else {
                    console.error('Failed to update menu data:', response.status);
                }
            } catch (error) {
                console.error('Error updating menu data:', error);
            }
        }
    } catch (error) {
        console.error(error);
    }
});
