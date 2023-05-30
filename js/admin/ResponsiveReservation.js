const menuSelect = document.getElementById('menu');
const courseSelect = document.getElementById('course');
const selectedCoursesContainer = document.getElementById('selected-courses-container');
let selectedCourses = [];

let menuData;

async function fetchMenuData() {
    const menus = [1, 2];
    menuData = await Promise.all(menus.map(async (menuId) => {
        const response = await axios.get(`http://localhost:8080/menu/${menuId}`);
        return response.data;
    }));

    menuData.forEach((menu) => {
        const option = document.createElement('option');
        option.value = menu.id;
        option.textContent = menu.name;
        if (menu.id == '2') {
            option.disabled = true;
        }
        menuSelect.append(option);
    });
}

document.getElementById('people').addEventListener('change', updateMenuAvailability);
document.getElementById('date').addEventListener('change', updateMenuAvailability);

function updateMenuAvailability() {
    console.log('updateMenuAvailability');
    const people = document.getElementById('people').value;
    const time = document.getElementById('date').value;

    const isPeopleCountValid = 20 <= people;
    const hour = new Date(time).getHours();
    const isTimeValid = 18 <= hour;

    const isMenu2Available = isPeopleCountValid && isTimeValid;
    const menu2Option = menuSelect.querySelector('option[value="2"]');
    menu2Option.disabled = !isMenu2Available;
}
menuSelect.addEventListener('click', async (e) => {
    const menuId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.disabled) {
        return;
    }
    courseSelect.innerHTML = '';
    const menu = menuData.find((menu) => menu.id == menuId);
    menu.menuItems.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name}`;
        courseSelect.append(option);
    });
});



let idCounter = 1;

const addCourseBtn = document.getElementById('add-course-btn');

addCourseBtn.addEventListener('click', () => {
    const courseId = courseSelect.value;
    const menuId = courseSelect.querySelector(`option[value="${courseId}"]`).parentNode.value;
    const courseName = courseSelect.options[courseSelect.selectedIndex].textContent;

    if (selectedCourses.length >= 3) {
        alert('You can only select 3 courses.');
        return;
    }

    selectedCourses.push({"courseId": courseId, "menuId": menuId, "selectId": idCounter});
    console.log(selectedCourses);

    const courseElement = document.createElement('div');
    courseElement.id = `course-${idCounter}`;
    courseElement.className = 'flex justify-between items-center';
    courseElement.innerHTML = `
        <span>${courseName}</span>
        <button type="button" class="bg-red-500 text-white px-2 py-1 rounded" onclick="removeCourse(${idCounter})">Remove</button>
    `;
    selectedCoursesContainer.append(courseElement);

    idCounter++;
});

function removeCourse(id) {
    selectedCourses = selectedCourses.filter(course => course.selectId !== id);
    const elementToRemove = document.getElementById(`course-${id}`);
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
    console.log(selectedCourses);
}

const form = document.getElementById('reservation-form');


window.onload = fetchMenuData;
