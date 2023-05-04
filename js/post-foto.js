const postFotoForm = document.getElementById('post-foto-form');
postFotoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = postFotoForm.elements['name'].value;
    const description = postFotoForm.elements['description'].value;
    const url = postFotoForm.elements['url'].value;

    const response = await fetch('http://localhost:8080/foto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            url: url
        })
    });

    if (response.ok) {
        alert('Foto posted successfully');
        postFotoForm.reset();
    } else {
        alert('Failed to post foto');
    }
});
