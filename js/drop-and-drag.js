window.onload = async function () {
    const menuData = menuPlaceHolder;
    const menuItems = document.querySelector('#menu-items');
    const menuName = document.querySelector('#menu-name');

    menuData.menuItems.forEach((item, index) => {
        const menuItem = `
            <div id="menu-item-${index}" class="menu-item bg-gray-200 flex flex-row justify-between max-w-6xl sm:max-w-md">
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
            Array.from(menuItems.children).forEach((child, index) => {
                const orderNumber = child.querySelector('.order-number');
                orderNumber.textContent = `${index + 1}. `;
            });
        }
    });
}
