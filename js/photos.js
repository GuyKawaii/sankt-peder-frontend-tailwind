const photoList = document.getElementById('photoList');

fetch('http://localhost:8080/fotos')
    .then(response => response.json())
    .then(data => {
        data.forEach(photo => {
            const listItem = document.createElement('li');

            const image = document.createElement('img');
            image.src = photo.url;
            image.alt = photo.name;
            image.width = '100';
            listItem.appendChild(image);

            const title = document.createElement('h2');
            title.textContent = photo.name;
            listItem.appendChild(title);

            const description = document.createElement('p');
            description.textContent = photo.description;
            listItem.appendChild(description);

            const link = document.createElement('a');
            link.href = photo.url;
            link.textContent = 'View full size';
            listItem.appendChild(link);

            photoList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
