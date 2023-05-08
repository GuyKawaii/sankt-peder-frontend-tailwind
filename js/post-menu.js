const form = document.getElementById('create-menu-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.elements['name'].value;
    const description = form.elements['description'].value;
    const price = form.elements['price'].value;
    const picture = form.elements['picture'].value;

    const menuItem = {
        name: name,
        description: description,
        price: price,
        picture: picture
    };

    const response = await fetch('http://localhost:8080/menuItem', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuItem)
    });

    if (response.ok) {
        alert('Menu created successfully!');
        form.reset();
    } else {
        alert('Error creating menu');
    }
});
