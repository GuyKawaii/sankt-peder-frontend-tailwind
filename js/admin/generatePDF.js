const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/login.html";
}


document.addEventListener('DOMContentLoaded', function () {
    // Get all the "Generate PDF" buttons
    const generatePDFBtns = document.querySelectorAll('.generate-pdf-btn');

    generatePDFBtns.forEach(function (btn) {
        btn.addEventListener('click', generatePDF);
    });
});

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
                openPDF(url); // Open the PDF in the browser
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