const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/login.html";
}

async function getMenu(menuId) {
    let response = await fetch('http://localhost:8080/menu/' + menuId);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return await response.json();
    }
}

window.onload = async function () {
    try {
        const menuData = await getMenu(1);
        const menuItems = document.querySelector('#menu-items');
        const menuName = document.querySelector('#menu-name');

        // Access the nested menuItems array
        menuData.menuItems[0].menuItems.forEach((item, index) => {
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
    } catch (error) {
        console.log(error);
    }
}
