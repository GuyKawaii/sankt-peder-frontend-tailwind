function getUserFromToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href =
            "http://localhost:63342/sankt-peder-frontend-tailwind/frontend-tailwindcss/html/admin/login.html";
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
            user: payload.sub,
            roles: payload.roles,
        };
    } catch (err) {
        console.error("Error decoding token:", err);
        return null;
    }
}


const adminLogoutButton = document.getElementById('btn-admin-logout');

adminLogoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = 'http://localhost:63342/sankt-peder-frontend-tailwind/html/admin/login.html';
});

const adminLandingContainer = document.getElementById('admin-landing');

function showAdminLandingPage() {
    const loggedInUser = getUserFromToken();
    if (loggedInUser && loggedInUser.roles.includes('ADMIN')) {
        const loggedInUserElement = document.getElementById('logged-in-user');
        loggedInUserElement.textContent = `Logged in as: ${loggedInUser.user}`;
    }
}


showAdminLandingPage();