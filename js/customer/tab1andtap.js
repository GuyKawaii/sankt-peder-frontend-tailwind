let typeSelection, guestsSelection, dateSelection, timeSelection;

function selectType(type) {
    typeSelection = type;
    changeTab(2);
}

function selectGuests(guests) {
    guestsSelection = guests;
    changeTab(3);
}

function selectDate(day) {
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    day = day.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');

    let formattedDate = `${day}-${month}-${year.toString().slice(-2)}`;
    dateSelection = formattedDate;
    changeTab(4);
}


function selectTime(time) {
    timeSelection = time;
    updateSummary();
    changeTab(5);
}


function updateSummary() {
    document.getElementById('summary-type').innerHTML = typeSelection;
    document.getElementById('summary-guests').innerHTML = guestsSelection;
    document.getElementById('summary-date-time').innerHTML = dateSelection + ' ' + timeSelection;
}



function changeTab(tabNumber) {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`tab${i}`).classList.add('hidden');
        document.querySelector(`button[onclick='changeTab(${i})']`).classList.remove('bg-blue-500', 'text-white');
        document.querySelector(`button[onclick='changeTab(${i})']`).classList.add('bg-gray-200', 'text-black');
    }

    document.getElementById(`tab${tabNumber}`).classList.remove('hidden');
    document.querySelector(`button[onclick='changeTab(${tabNumber})']`).classList.remove('bg-gray-200', 'text-black');
    document.querySelector(`button[onclick='changeTab(${tabNumber})']`).classList.add('bg-blue-500', 'text-white');

    if (tabNumber === 5) {
        updateSummary();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    changeTab(1);
});

function consentChange() {
    if (document.getElementById('consentCheckbox').checked) {
        document.getElementById('confirmButton').disabled = false;
    } else {
        document.getElementById('confirmButton').disabled = true;
    }
}


function validateInput() {
    let phonePattern = /^\d{8}$/;
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let phoneValid = phonePattern.test(document.getElementById('customer-phone').value);
    let emailValid = emailPattern.test(document.getElementById('customer-email').value);

    // Set error messages
    document.getElementById('name-error').innerText = document.getElementById('customer-name').value === "" ? "Indtast navn" : "";
    document.getElementById('phone-error').innerText = !phoneValid ? "Indtast venligst et 8-cifret telefonnummer" : "";
    document.getElementById('email-error').innerText = !emailValid ? "Indtast venligst en gyldig email" : "";
}


