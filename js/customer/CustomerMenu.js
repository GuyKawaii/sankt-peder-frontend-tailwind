// return the menu from the database
async function getMenu(menuId) {
    return fetch('http://localhost:8080/menu/' + menuId)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error(error);
            return null;
        });
}

// initial menu selection
window.onload = async function () {
    createMenu([1]);
}

async function createMenu(menuIds) {
    const menu = document.querySelector('#dynamic_menu');
    menu.innerHTML = '';

    // Iterate over each menu ID
    for (const menuId of menuIds) {
        // Fetch the menu data
        let menuData = await getMenu(menuId);

        let menuItems = ``;

        // Create the menu items
        menuData.menuItems.forEach((item, index) => {
            // Generate the HTML for a single menu item
            let menuItemHTML = `
                <div id="menu-item-${item.id}" class="menu-item flex flex-row justify-between max-w-6xl sm:max-w-md">
                    <div class="order-number mr-4">${index + 1}. </div>
                    <div class="menu-item-main flex-grow">
                        <p class="menu-item-title font-bold">${item.name}</p>
                        ${item.description ? `<p class="menu-item-description">${item.description}</p>` : ''}
                    </div>
                    ${item.price !== "0" ? `<span class="menu-item-price ml-4">${item.price},-</span>` : ''}
                </div>
            `;

            // Append the menuItemHTML to the menuItems
            menuItems += menuItemHTML;
        });

        // Create the menu section
        let menuSection = `
            <div class="flex w-full flex-col items-center justify-center">
                <h2 class="p-4">${menuData.name}</h2>
                <div class="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-3">
                    ${menuItems}
                </div>
            </div>
        `;

        // Append the menu section to the menu container
        menu.innerHTML += menuSection;
    }
}




const button_1 = document.querySelector('#menu_1');
const button_2 = document.querySelector('#menu_2');
const button_3 = document.querySelector('#menu_3');
const button_4 = document.querySelector('#menu_4');

button_1.addEventListener('click', () => {
        createMenu([1]);
    }
);

button_2.addEventListener('click', () => {
        createMenu([2])
    }
);

button_3.addEventListener('click', () => {
        createMenu([6]);
    }
);

button_4.addEventListener('click', () => {
        createMenu([10, 11, 12, 13]);
    }
);