const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/login.html";
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
    console.log("Updating menu data:", menuData);
}
