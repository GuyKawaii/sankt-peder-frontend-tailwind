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
}

// Mocking the getMenu function to return placeholder data
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
            <button class="delete-item-btn" data-index="${index}">Delete</button>
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

        // Event listeners + modal som deaktiverer alt andet end modalen selv. Dvs når pop-up boxen kommer frem
        //kan man ikke andet :D smart var????
        document.querySelector('#add-item-btn').addEventListener('click', () => {
            document.querySelector('#add-item-modal').classList.remove('hidden');
        });

        document.querySelector('#close-modal-btn').addEventListener('click', () => {
            document.querySelector('#add-item-modal').classList.add('hidden');
        });

        document.querySelector('#add-item-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.querySelector('#item-name').value;
            const description = document.querySelector('#item-description').value;
            const price = document.querySelector('#item-price').value;

            const newItem = {
                id: Math.max(...menuData.menuItems.map(item => item.id)) + 1,
                name: name,
                description: description,
                price: price
            };

            menuData.menuItems.push(newItem);
            menuItems.innerHTML += createMenuItem(newItem, menuData.menuItems.length - 1);

            // Clear input fields
            document.querySelector('#item-name').value = '';
            document.querySelector('#item-description').value = '';
            document.querySelector('#item-price').value = '';

            // Close modal
            document.querySelector('#add-item-modal').classList.add('hidden');
        });

        document.querySelector('#menu-items').addEventListener('click', (event) => {
            if (event.target.matches('.delete-item-btn')) {
                const index = parseInt(event.target.dataset.index, 10);
                menuData.menuItems.splice(index, 1);
                menuItems.removeChild(menuItems.children[index]);
            }
        });

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
            onEnd: function() {
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

async function updateMenu(menuData) {
// Mocking the updateMenu function to just log the updated data
    console.log("Updating menu data:", menuData);
}
