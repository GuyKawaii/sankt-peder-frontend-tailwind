// getUserFromToken function
function getUserFromToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href =
            "http://localhost:63342/sankt-peder-frontend-tailwind/frontend-tailwindcss/html/admin/login.html";
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
            user: payload.sub, // Assuming the username is stored in the 'sub' claim
            roles: payload.roles,
        };
    } catch (err) {
        console.error("Error decoding token:", err);
        return null;
    }
}


// Logout button on admin page
const adminLogoutButton = document.getElementById('btn-admin-logout');

adminLogoutButton.addEventListener('click', () => {
    // Clear token and related information from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page from admin page
    window.location.href = 'http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/login.html';
});

// admin landing page and logout
const adminLandingContainer = document.getElementById('admin-landing');

function showAdminLandingPage() {
    const loggedInUser = getUserFromToken(); // Function to retrieve user from token
    if (loggedInUser && loggedInUser.roles.includes('ADMIN')) {
        const loggedInUserElement = document.getElementById('logged-in-user');
        loggedInUserElement.textContent = `Logged in as: ${loggedInUser.user}`;
    }
}


// Call the showAdminLandingPage function when the page loads
showAdminLandingPage();