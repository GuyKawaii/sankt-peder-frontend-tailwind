async function getMenu(menuId) {
    try {
        const response = await fetch('http://localhost:8080/menu/' + menuId);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function addMenuToPage(menuName, menuItems, menuId) {
    return async function () {
        const menuData = await getMenu(menuId);

        if (menuData) {
            console.log("menuData for menuId:", menuId);
            console.log(menuData);

            menuItems.innerHTML = '';

            menuData.menuItems.forEach(item => {
                const menuItem = `
          <div class="menu-item bg-gray-200 flex flex-col ">
              <img class="menu-item-image" src="http://localhost:8080/image/${item.image.id}" alt="${item.name}">
              <div class="menu-item-details-container flex flex-row justify-between">
                <div class="menu-item-details">
                  <p class="menu-item-title font-bold">${item.name}</p>
                  <p class="menu-item-description">${item.description}</p>
                </div>
                <div class="menu-item-price-container">
                  <span class="menu-item-price">${item.price},-</span>
                </div>
              </div>
          </div>
        `;

                menuItems.innerHTML += menuItem;
            });

            menuName.innerHTML = menuData.name;
        }
    };
}

window.onload = function () {
    const menuIds = [1, 2];

    for (const menuId of menuIds) {
        const menuName = document.querySelector('#menu-name-' + menuId);
        const menuItems = document.querySelector('#menu-items-' + menuId);

        const addMenu = addMenuToPage(menuName, menuItems, menuId);

        addMenu();
    }
};
