const menuPlaceHolder = {
    "id": 1,
    "name": "MENU 11.30 - 21.00",
    "menuItems": [
        {
            "id": 1,
            "name": "Sankt Peders hjemmelavede karrysild m. æble og æg",
            "description": "Herring in homemade curry dressing with eggs (house speciality)\n",
            "price": "95"
        },
        {
            "id": 2,
            "name": "\"Sol over Sankt Peder\" Røget makrel, radiser, purløg, æggeblomme",
            "description": "\"Sun over Sankt Peder\" smoked mackerel, radishes, chives, egg yolk",
            "price": "120"
        },
        {
            "id": 3,
            "name": "Lun leverpostej m. bacon og rødbeder og agurkesalat",
            "description": "Warm liver paste with bacon and pickled cucumber",
            "price": "100"
        },
        {
            "id": 4,
            "name": "Ruths kryddersild fra Christiansø m. rødløg og kapers",
            "description": "Ruth’s pickled herring from 'Christiansø' with onions and capers",
            "price": "100"
        },
        {
            "id": 5,
            "name": "”Den Fromme” avocado på ristet rugbrød, rejer og creme fraiche",
            "description": "”The Pious” Avocado on toasted rye bread with shimps and sour creme",
            "price": "125"
        },
        {
            "id": 6,
            "name": "Landskinke m. spejlæg, tomater og purløg",
            "description": "Ham with fried egg, tomatoes and chives",
            "price": "100"
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
    // const menuData = await getMenu(1);
    const menuData = menuPlaceHolder
    console.log("menuData");
    console.log(menuData);
    const menuItems = document.querySelector('#menu-items');
    const menuName = document.querySelector('#menu-name');

    menuData.menuItems.forEach(item => {
        const menuItem = `
            <div class="menu-item bg-gray-200 flex flex-row justify-between max-w-6xl sm:max-w-md">
                <div class="menu-item-main">
                    <p class="menu-item-title font-bold">${item.name}</p>
                    <p class="menu-item-description">${item.description}</p>
                </div>
                <span class="menu-item-price ml-4">${item.price},-</span>
            </div>
        `;

        menuItems.innerHTML += menuItem;
    });

    menuName.innerHTML = menuData.name;
}