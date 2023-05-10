const menuPlaceHolder = {
    "id": 1,
    "name": "MENU 11.30 - 21.00",
    "menuItems": [
        {
            "menu": {
                "id": 1,
                "name": "Updated Menu Name"
            },
            "menuItems": [

                {
                    "id": 2,
                    "name": "Updated MenuItem 2",
                    "description": "Updated description for MenuItem 2",
                    "price": "15.99"
                },
                {
                    "id": 4,
                    "name": "NEW ITEM",
                    "description": "NEW ITEM NICE",
                    "price": "15.99"
                },
                {
                    "id": 1,
                    "name": "Updated MenuItem 1",
                    "description": "Updated description for MenuItem 1",
                    "price": "99.50"
                },
            ]
        }
    ]
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

window.onload = async function () {
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
        onEnd: function() {
            const newOrder = Array.from(menuItems.children).map((child, index) => {
                const orderNumber = child.querySelector('.order-number');
                orderNumber.textContent = `${index + 1}. `;
                const id = parseInt(child.id.replace('menu-item-', ''));
                return menuData.menuItems.find(item => item.id === id);
            });
            menuData.menuItems = newOrder;
            updateMenu(menuData);
        }
    });
}

async function updateMenu(menuData) {
    return fetch('http://localhost:8080/menu/' + menuData.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData)
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
}
