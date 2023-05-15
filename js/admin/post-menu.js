document.getElementById('menuForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    var name = document.getElementById('name').value;

    // Create menu object
    var menu = {
        name: name
    };

    // Make POST request to the server
    fetch('http://localhost:8080/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    })
        .then(function(response) {
            if (response.ok) {
                alert('Menu created successfully!');
                location.reload(); // Refresh the page
            } else {
                throw new Error('Error creating menu');
            }
        })
        .catch(function(error) {
            console.log(error);
            alert('An error occurred while creating the menu');
        });
});
