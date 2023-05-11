const menuPlaceHolder = {
    "id": 1,
    "name": "Updated Menu Name 2",
    "menuItems": [
        {
            "id": 1,
            "name": "Updated MenuItem 1 2",
            "description": "Updated description for MenuItem 1",
            "price": "99,57",
            "image": {
                "hibernateLazyInitializer": {},
                "id": 1,
                "url": "https://example.com/images/karrysild.jpg"
            }
        },
        {
            "id": 2,
            "name": "Updated MenuItem 2 2",
            "description": "Updated description for MenuItem 2",
            "price": "15,99",
            "image": {
                "hibernateLazyInitializer": {},
                "id": 2,
                "url": "https://example.com/images/smoked-mackerel.jpg"
            }
        },
        {
            "id": 3,
            "name": "NEW ITEM",
            "description": "NEW ITEM NICE 2",
            "price": "15,99",
            "image": {
                "hibernateLazyInitializer": {},
                "id": 3,
                "url": "https://example.com/images/smoked-mackerel.jpg"
            }
        }
    ]
};

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
        <button class="edit-item-btn" data-index="${index}">Edit</button>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        let menuData = await getMenu(1);
        const menuItems = document.querySelector('#menu-items');
        const menuName = document.querySelector('#menu-name');

        menuData.menuItems.forEach((item, index) => {
            const menuItem = createMenuItem(item, index);
            menuItems.innerHTML += menuItem;
        });

        menuName.innerHTML = menuData.name;

        document.querySelector('#menu-items').addEventListener('click', (event) => {
            if (event.target.matches('.edit-item-btn')) {
                const index = parseInt(event.target.dataset.index, 10);
                const itemToEdit = menuData.menuItems[index];
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
                    menuItems.children[index].outerHTML = editedMenuItem;
                    document.querySelector('#edit-item-modal').classList.add('hidden');
                    updateMenuItem(itemToEdit, itemToEdit.id);

                };

            }
        });

        document.querySelector('#close-edit-modal-btn').addEventListener('click', () => {
            document.querySelector('#edit-item-modal').classList.add('hidden');
        });

        // Function to update menu item via API
        async function updateMenuItem(item, itemId) {
            try {
                const response = await fetch(`http://localhost:8080/menuItem/menuItems/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                });

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


    } catch (error) {
        console.log(error);
    }
});

window.onload = async function () {
    try {
        let menuData = await getMenu(1);
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
                updateMenuItemOrder(newOrder);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to update menu item order via API
async function updateMenuItemOrder(menuItems) {
    try {
        const response = await fetch('http://localhost:8080/menuItem/updateMenuItems', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menuItems)
        });

        if (response.ok) {
            const updatedItems = await response.json();
            console.log('Updated menu item order:', updatedItems);
        } else {
            console.error('Failed to update menu item order:', response.status);
        }
    } catch (error) {
        console.error('Error updating menu item order:', error);
    }
}
