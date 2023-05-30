async function getMenu(menuId) {
    try {
        const response = await fetch(`http://localhost:8080/menu/${menuId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

window.onload = async function () {
    createMenu([1]);
}

async function createMenu(menuIds) {
    const menuContainer = document.querySelector('#dynamic_menu');
    menuContainer.innerHTML = '';

    for (const menuId of menuIds) {
        let menuData = await getMenu(menuId);

        let menuItems = '';

        menuData.menuItems.forEach((item, index) => {
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

            menuItems += menuItemHTML;
        });

        let menuSection = `
            <div class="flex w-full flex-col items-center justify-center">
                <h2 class="p-4">${menuData.name}</h2>
                <div class="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-3">
                    ${menuItems}
                </div>
                <button class="generate-pdf-btn" data-menu-id="${menuId}">Download PDF</button>
            </div>
        `;

        menuContainer.innerHTML += menuSection;
    }

    const generatePDFBtns = document.querySelectorAll('.generate-pdf-btn');
    generatePDFBtns.forEach(function (btn) {
        btn.addEventListener('click', generatePDF);
    });
}

async function generatePDF(event) {
    try {
        const menuId = parseInt(event.currentTarget.dataset.menuId);
        const menuData = await getMenu(menuId);

        if (menuData) {
            const htmlContent = getMenuHTML(menuData);
            const pdfData = {
                htmlContent: htmlContent
            };

            const response = await fetch('http://localhost:8080/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pdfData),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                openPDF(url);
            } else {
                throw new Error('Failed to generate PDF.');
            }
        } else {
            throw new Error('Failed to fetch menu data.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while generating the PDF. Please try again.');
    }
}

function getMenuHTML(menuData) {
    let menuHTML = `
        <h2>${menuData.name}</h2>
        <ul>
    `;

    menuData.menuItems.forEach((menuItem) => {
        menuHTML += `
            <li>
                <h4>${menuItem.name}</h4>
                <p>${menuItem.description}</p>
                <p>${menuItem.price}</p>
            </li>
        `;
    });

    menuHTML += '</ul>';

    return menuHTML;
}

function openPDF(url) {
    window.open(url, '_blank');
}

function downloadPDF(url) {
    openPDF(url);
}

const button_1 = document.querySelector('#menu_1');
const button_2 = document.querySelector('#menu_2');
const button_3 = document.querySelector('#menu_3');
const button_4 = document.querySelector('#menu_4');

button_1.addEventListener('click', () => {
    createMenu([1]);
});

button_2.addEventListener('click', () => {
    createMenu([2]);
});

button_3.addEventListener('click', () => {
    createMenu([6]);
});

button_4.addEventListener('click', () => {
    createMenu([10, 11, 12, 13]);
});
