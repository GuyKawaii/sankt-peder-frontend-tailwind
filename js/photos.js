async function fetchPhotos() {
    const photoList = document.getElementById('photoList');

    try {
        const response = await fetch('http://localhost:8080/fotos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            responseType: 'arraybuffer'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        data.forEach(photo => {
            const listItem = document.createElement('li');

            const image = document.createElement('img');
            image.src = 'data:image/jpeg;base64,' + photo.data;
            image.alt = photo.menuItemName;
            image.width = '100';
            listItem.appendChild(image);

            const title = document.createElement('h2');
            title.textContent = photo.menuItemName;
            listItem.appendChild(title);

            const description = document.createElement('p');
            description.textContent = photo.menuItemDescription;
            listItem.appendChild(description);

            const link = document.createElement('a');
            link.href = 'data:image/jpeg;base64,' + photo.data;
            link.textContent = 'View full size';
            listItem.appendChild(link);

            photoList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchPhotos();
