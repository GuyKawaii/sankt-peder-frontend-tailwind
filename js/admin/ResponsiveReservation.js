const menuSelect = document.getElementById('menu');
const courseSelect = document.getElementById('course');
const selectedCoursesContainer = document.getElementById('selected-courses-container');
let selectedCourses = [];
let menusData = [];
let maxItemsFromMenu2 = 3;

// Fetch menu data from the API
async function fetchMenuData() {
    const menuIds = [1, 2];  // Replace with actual menu IDs
    for (let i = 0; i < menuIds.length; i++) {
        const response = await axios.get(`http://localhost:8080/menu/${menuIds[i]}`);
        menusData.push(response.data);
        const option = document.createElement('option');
        option.value = response.data.id;
        option.textContent = response.data.name;
        menuSelect.append(option);
    }
}

// Fetch course data when a menu is selected
menuSelect.addEventListener('change', async (e) => {
    courseSelect.innerHTML = '';  // Clear previous course options
    const menuId = e.target.value;
    const selectedMenuData = menusData.find(menu => menu.id === parseInt(menuId));
    const maxItems = (menuId === '2' && document.getElementById('people').value > 25) ? maxItemsFromMenu2 : Infinity;
    selectedMenuData.menuItems.slice(0, maxItems).forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name} - ${item.description} - $${item.price}`;
        courseSelect.append(option);
    });
});

// Add course to the selected courses when a course is selected
courseSelect.addEventListener('change', (e) => {
    if (selectedCourses.length >= 3) {  // Maximum limit for a 3-course meal
        alert('You can only select 3 courses.');
        return;
    }
    const courseId = e.target.value;
    const courseName = e.target.options[e.target.selectedIndex].textContent;
    selectedCourses.push(courseId);

    const courseElement = `
            <div class="flex justify-between items-center" data-id="${courseId}">
                <span>${courseName}</span>
                <button type="button" class="bg-red-500 text-white px-2 py-1 rounded" onclick="removeCourse(${courseId})">Remove</button>
            </div>`;

    selectedCoursesContainer.innerHTML += courseElement;
});

// Remove a course from the selected courses when its "Remove" button is clicked
function removeCourse(courseId) {
    const courseIndex = selectedCourses.indexOf(courseId);
    if (courseIndex > -1) {
        selectedCourses.splice(courseIndex, 1);
        const courseElement = selectedCoursesContainer.querySelector(`[data-id="${courseId}"]`);
        selectedCoursesContainer.removeChild(courseElement);
    }
}

// Update menu options when the number of people or reservation time changes
['people', 'date'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
        const numPeople = document.getElementById('people').value;
        const reservationTime = new Date(document.getElementById('date').value);
        const hour = reservationTime.getUTCHours();
        if (numPeople > 25 && hour >= 12 && hour <= 17) {
            document.querySelector('option[value="2"]').disabled = true;
            if (menuSelect.value === '2') {
                menuSelect.value = '1';
                menuSelect.dispatchEvent(new Event('change'));
            }
        } else {
            document.querySelector('option[value="2"]').disabled = false;
        }
    });
});

// Load menu data on page load
window.onload = fetchMenuData;

// Add event listener to the form submission
document.getElementById('reservation-form').addEventListener('submit', (event) => {
    event.preventDefault();  // Stop form from submitting normally
    // Here you can add your code to handle form submission.
    // You have the selectedCourses array that contains the IDs of selected courses.
    console.log(selectedCourses);  // For demonstration purposes
});

