function generateDates() {
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let calendarHTML = `
        <button class="px-2 py-1 bg-gray-200 hover:bg-blue-400 rounded z-10" onclick="changeMonth(-1)">Previous</button>
        <span class="text-center w-full">${months[month]} ${year}</span>
        <button class="px-2 py-1 bg-gray-200 hover:bg-blue-400 rounded z-10" onclick="changeMonth(1)">Next</button>
    `;

    document.getElementById('calendarNavigation').innerHTML = calendarHTML;

    let daysHTML = '';
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        daysHTML += `
            <label class="inline-flex items-center cursor-pointer bg-gray-200 px-3 py-2 rounded-full text-center w-12 justify-center m-1 hover:bg-blue-400" onclick="selectDate(${i})">
              <span class="text-center w-full">${i}</span>
            </label>
        `;
    }

    document.getElementById('datesContainer').innerHTML = daysHTML;
}



let currentDate = new Date();

function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    generateDates();
}
window.onload = function() {
    generateGuestNumbers();
    changeMonth(0);  // initializes the calendar with the current date
    document.getElementById('timeSlotsContainer').innerHTML = generateTimeSlots();
};


