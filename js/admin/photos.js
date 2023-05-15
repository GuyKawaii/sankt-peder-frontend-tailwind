const menuPlaceHolder = {
    "id": 1,
    "name": "MENU 11.30 - 21.00",
    "menuItems": [
        {
            "id": 1,
            "name": "Sankt Peders hjemmelavede karrysild m. æble og æg",
            "description": "Herring in homemade curry dressing with eggs (house speciality)\n",
            "price": "95",
            "image": {
                "url": "https://images.squarespace-cdn.com/content/v1/58fdbf7a414fb5f448b27d39/1494936109016-M5T4V8FDAW72QX7K7NSI/image-asset.jpeg?format=500w",
                "alt": "Image Alt Text",
                "caption": "Image Caption"
            }
        },
        {
            "id": 2,
            "name": "\"Sol over Sankt Peder\" Røget makrel, radiser, purløg, æggeblomme",
            "description": "\"Sun over Sankt Peder\" smoked mackerel, radishes, chives, egg yolk",
            "price": "120",
            "image": {
                "url": "https://images.squarespace-cdn.com/content/v1/58fdbf7a414fb5f448b27d39/1494936109016-M5T4V8FDAW72QX7K7NSI/image-asset.jpeg?format=500w",
                "alt": "Image Alt Text",
                "caption": "Image Caption"
            }

        },
        {
            "id": 3,
            "name": "Lun leverpostej m. bacon og rødbeder og agurkesalat",
            "description": "Warm liver paste with bacon and pickled cucumber",
            "price": "100",
            "image": {
                "url": "https://images.squarespace-cdn.com/content/v1/58fdbf7a414fb5f448b27d39/1494936109016-M5T4V8FDAW72QX7K7NSI/image-asset.jpeg?format=500w",
                "alt": "Image Alt Text",
                "caption": "Image Caption"
            }
        },
        {
            "id": 4,
            "name": "Ruths kryddersild fra Christiansø m. rødløg og kapers",
            "description": "Ruth’s pickled herring from 'Christiansø' with onions and capers",
            "price": "100",
            "image": {
                "url": "https://images.squarespace-cdn.com/content/v1/58fdbf7a414fb5f448b27d39/1494936109016-M5T4V8FDAW72QX7K7NSI/image-asset.jpeg?format=500w",
                "alt": "Image Alt Text",
                "caption": "Image Caption"
            }
        },
        {
            "id": 5,
            "name": "”Den Fromme” avocado på ristet rugbrød, rejer og creme fraiche",
            "description": "”The Pious” Avocado on toasted rye bread with shimps and sour creme",
            "price": "125",
            "image": {
                "url": "https://images.squarespace-cdn.com/content/v1/58fdbf7a414fb5f448b27d39/1494936109016-M5T4V8FDAW72QX7K7NSI/image-asset.jpeg?format=500w",
                "alt": "Image Alt Text",
                "caption": "Image Caption"
            }
        },
        {
            "id": 6,
            "name": "Landskinke m. spejlæg, tomater og purløg",
            "description": "Ham with fried egg, tomatoes and chives",
            "price": "100",
            "image": {
                "url": "https://images.squarespace-cdn.com/content/v1/58fdbf7a414fb5f448b27d39/1494936109016-M5T4V8FDAW72QX7K7NSI/image-asset.jpeg?format=500w",
                "alt": "Image Alt Text",
                "caption": "Image Caption"
            }
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
    const menuData = await getMenu(1);
    console.log("menuData");
    console.log(menuData);
    // const menuData = menuPlaceHolder
    const menuItems = document.querySelector('#menu-items');
    const menuName = document.querySelector('#menu-items2');

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