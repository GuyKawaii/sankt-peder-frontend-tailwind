const form = document.getElementById('create-menu-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.elements['name'].value;
    const description = form.elements['description'].value;
    const price = form.elements['price'].value;

    const response = await fetch('http://localhost:8080/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            price: price
        })
    });

    if (response.ok) {
        alert('Menu created successfully!');
        form.reset();
    } else {
        alert('Error creating menu');
    }
});
