
    let startTime = 10;  // start time (10:00)
    let endTime = 21;  // end time (21:00)
    let timeSlots = [];

    while (startTime < endTime) {
    let startMinutes = (startTime * 60) % 60;
    let startHours = Math.floor(startTime);

    // Format hours and minutes
    startHours = startHours < 10 ? '0'+startHours : startHours;
    startMinutes = startMinutes < 10 ? '0'+startMinutes : startMinutes;

    // Push formatted time to array
    timeSlots.push(startHours + ':' + startMinutes);

    // Increment time by 1 hour 15 minutes
    startTime += 1.25;
}

    for (let i = 0; i < timeSlots.length; i++) {
    document.write(`
            <label class="flex items-center cursor-pointer bg-gray-200 px-3 py-2 rounded-full text-center w-20 justify-center m-1 hover:bg-blue-400" onclick="changeTab(5)">
              <div class="flex flex-col items-center">
                <span class="text-center w-full">${timeSlots[i]}</span>
              </div>
            </label>
          `);
}
