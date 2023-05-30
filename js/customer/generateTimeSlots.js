function generateTimeSlots() {
    let startTime = 10;
    let endTime = 21;
    let timeSlots = [];

    while (startTime < endTime) {
        let startMinutes = (startTime * 60) % 60;
        let startHours = Math.floor(startTime);

        startHours = startHours < 10 ? '0' + startHours : startHours;
        startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes;

        timeSlots.push(startHours + ':' + startMinutes);

        startTime += 1.25;
    }

    let timesHTML = '';

    for (let i = 0; i < timeSlots.length; i++) {
        timesHTML += `
        <label onclick="selectTime('${timeSlots[i]}')" class="flex items-center cursor-pointer bg-gray-200 px-3 py-2 rounded-full text-center w-20 justify-center m-1 hover:bg-blue-400">
            <span class="text-center w-full">${timeSlots[i]}</span>
        </label>
        `;
    }

    return timesHTML;
}
window.onload = function() {
    generateGuestNumbers();
    generateDates();
    document.getElementById('timeSlotsContainer').innerHTML = generateTimeSlots();
};
function selectTime(time) {

    changeTab(5);
}

