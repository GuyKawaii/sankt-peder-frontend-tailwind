function generateGuestNumbers() {
    let guestNumbersHTML = '';
    for (let i = 10; i <= 50; i++) {
        guestNumbersHTML += `
            <label onclick="selectGuests(${i})" class="flex items-center cursor-pointer bg-gray-200 px-3 py-2 rounded-full text-center w-12 justify-center m-1 hover:bg-blue-400">
                <span class="text-center w-full">${i}</span>
            </label>
        `;
    }
    document.getElementById('guestNumberContainer').innerHTML = guestNumbersHTML;
}

function selectGuests(number) {
    // Save the selected number of guests. This could be in a global variable or local storage.
    // ...Your code here...

    // Go to the next tab.
    changeTab(3);
}

window.onload = function() {
    generateGuestNumbers();
};
