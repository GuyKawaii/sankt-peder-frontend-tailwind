const updateFotoForm = document.getElementById('update-foto-form');
const fotoSelect = document.getElementById('foto-select');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const urlInput = document.getElementById('url');

async function populateFotoSelect() {
    const response = await fetch('http://localhost:8080/fotos');
    const fotos = await response.json();

    while (fotoSelect.firstChild) {
        fotoSelect.removeChild(fotoSelect.firstChild);
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select a foto';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    fotoSelect.appendChild(defaultOption);

    fotos.forEach(foto => {
        const option = document.createElement('option');
        option.value = foto.id;
        option.text = `${foto.name} (${foto.id})`;
        fotoSelect.appendChild(option);
    });
}

populateFotoSelect();

fotoSelect.addEventListener('change', async () => {
    const id = fotoSelect.value;

    if (!id) {
        nameInput.value = '';
        descriptionInput.value = '';
        urlInput.value = '';
        return;
    }

    const response = await fetch(`http://localhost:8080/fotos/${id}`);
    const foto = await response.json();
    nameInput.value = foto.name;
    descriptionInput.value = foto.description;
    urlInput.value = foto.url;
});

updateFotoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = fotoSelect.value;
    const name = nameInput.value;
    const description = descriptionInput.value;
    const url = urlInput.value;

    const foto = {
        name: name,
        description: description,
        url: url
    };

    const response = await fetch(`http://localhost:8080/foto/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foto)
    });

    if (response.ok) {
        alert('Foto updated successfully');
        populateFotoSelect();
    } else {
        alert('Failed to update foto');
    }
});

const deleteFotoButton = document.getElementById('delete-foto-button');
deleteFotoButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const id = fotoSelect.value;

    if (!id) {
        alert('Please select a foto to delete');
        return;
    }

    const response = await fetch(`http://localhost:8080/foto/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Foto deleted successfully');
        populateFotoSelect();
    } else {
        alert('Failed to delete foto');
    }
});
