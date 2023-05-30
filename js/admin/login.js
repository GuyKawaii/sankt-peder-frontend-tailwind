let SERVER_URL = "http://localhost:8080/api/";

document.getElementById("btn-login").onclick = loginClick;
document.getElementById("btn-logout").onclick = logoutClick;

const userNameInput = document.getElementById("input-user");
const passwordInput = document.getElementById("input-password");
const responseStatus = document.getElementById("response");
const loginContainer = document.getElementById("login-container");
const logoutContainer = document.getElementById("logout-container");
const userDetails = document.getElementById("user-details");

const token = localStorage.getItem("token");
toggleLoginStatus(token);

async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message);
        error.apiError = errorResponse;
        throw error;
    }
    return res.json();
}

async function loginClick() {
    responseStatus.innerText = "";
    const loginRequest = {
        username: userNameInput.value,
        password: passwordInput.value
    };
    const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(loginRequest)
    };

    try {
        const res = await fetch(SERVER_URL + "auth/login", options).then(handleHttpErrors);
        storeLoginDetails(res);
    } catch (err) {
        responseStatus.style.color = "red";
        if (err.apiError) {
            responseStatus.innerText = err.apiError.message;
        } else {
            responseStatus.innerText = err.message;
        }
    }
}

function storeLoginDetails(res) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", res.username);
    // Update UI
    toggleLoginStatus(true);
    responseStatus.innerText = "Logged in as " + res.username;

    // Redirect to admin landing page
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/admin-landingpage.html";
    document.getElementById("hidden-button-container").style.display = "block";

}

function logoutClick() {
    clearLoginDetails();
}

function goToLandingPage() {
    window.location.href = "http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/admin-landingpage.html";
}
function clearLoginDetails() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Update UI
    toggleLoginStatus(false);
    responseStatus.innerText = "Logged out";
}

function toggleLoginStatus(loggedIn) {
    loginContainer.style.display = loggedIn ? "none" : "block";
    logoutContainer.style.display = loggedIn ? "block" : "none";
    const statusTxt = loggedIn ? "User: " + localStorage["user"] : "";
    userDetails.innerText = statusTxt;
    document.getElementById("hidden-button-container").style.display = loggedIn ? "block" : "none";
}
