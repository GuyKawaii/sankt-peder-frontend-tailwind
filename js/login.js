let SERVER_URL = "http://localhost:8080/api/"

document.getElementById("buttons").onclick = handleFetchBtnClick
document.getElementById("btn-login").onclick = loginLogoutClick
document.getElementById("btn-logout").onclick = loginLogoutClick

const userNameInput = document.getElementById("input-user")
const passwordInput = document.getElementById("input-password")
const responseStatus = document.getElementById("response")
const loginContainer = document.getElementById("login-container")
const logoutContainer = document.getElementById("logout-container")
const userDetails = document.getElementById("user-details")

const token = localStorage.getItem("token")
//If token existed, for example after a refresh, set UI accordingly
toogleLoginStatus(token)


/**
 * Provides support for error-responses given as JSON with status 4xx or 5xx
 * Meant to be used as callback in the first .then in a fetch call using async-await
 * @param res - Response object provided by fetch's first .then(..) method
 */
async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
    return res.json()
}


async function loginLogoutClick(evt) {
    evt.stopPropagation()  //prevents the event from bubling further up
    responseStatus.innerText = ""
    const logInWasClicked = evt.target.id === "btn-login" ? true : false
    if (logInWasClicked) {
        //Make the request object
        const loginRequest = {}
        loginRequest.username = userNameInput.value
        loginRequest.password = passwordInput.value
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(loginRequest)
        }
        try {
            const res = await fetch(SERVER_URL + "auth/login", options).then(handleHttpErrors)
            storeLoginDetails(res)
        } catch (err) {
            responseStatus.style.color = "red"
            if (err.apiError) {
                responseStatus.innerText = err.apiError.message
            } else {
                responseStatus.innerText = err.message
            }
        }
    } else {
        //Logout was clicked
        clearLoginDetails()
    }
}

/**
 * Store username, roles and token in localStorage, and update UI-status
 * @param res - Response object with details provided by server for a succesful login
 */
function storeLoginDetails(res) {
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", res.username)
    localStorage.setItem("roles", res.roles)
    //Update UI
    toogleLoginStatus(true)
    responseStatus.innerText = ""
}

/**
 * Remove username, roles and token from localStorage, and update UI-status
 */
function clearLoginDetails() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("roles")
    //Update UI
    toogleLoginStatus(false)
    responseStatus.innerText = ""
}

/**
 * Toogles, and updates the part of the UI related to login/logout
 * @param loggedIn - true if user are loggedin otherwise false
 */
function toogleLoginStatus(loggedIn) {
    loginContainer.style.display = loggedIn ? "none" : "block"
    logoutContainer.style.display = loggedIn ? "block" : "none"
    const statusTxt = loggedIn ? `User: ${localStorage["user"]} (${localStorage["roles"]})` : ""
    userDetails.innerText = statusTxt
}

function handleFetchBtnClick(evt) {
    evt.preventDefault()
    const node = evt.target;
    if (node.nodeName != "BUTTON") {
        return
    }
    let URL = SERVER_URL + "demo/";
    switch (node.id) {
        case "btn-anonymous": fetchDataAndUpdateUI(URL + "anonymous", false); break
        case "btn-authenticated": fetchDataAndUpdateUI(URL + "authenticated", true); break
        case "btn-user": fetchDataAndUpdateUI(URL + "user", true); break
        case "btn-admin": fetchDataAndUpdateUI(URL + "admin", true); break
        case "btn-user-admin": fetchDataAndUpdateUI(URL + "user-admin", true); break
        case "btn-user-from-token": fetchDataAndUpdateUI(URL + "user-fromtoken", true); break
    }
}

function setResponseText(txt, isOK) {
    responseStatus.style.color = isOK ? "darkgreen" : "red"
    responseStatus.innerText = txt
}

async function fetchDataAndUpdateUI(url, addToken) {
    const options = {
        method: "GET",
        headers: { "Accept": "application/json" }
    }
    if (addToken) {
        const token = localStorage.getItem("token")
        if (!token) {
            setResponseText("You must login to use this feature", false)
            return
        }

        options.headers.Authorization = "Bearer " + token
    }

    try {
        const res = await fetch(url, options).then(handleHttpErrors)
        setResponseText(res.info, true)
    } catch (err) {
        if (err.apiError) {
            setResponseText(err.apiError.message, false)
        } else {
            setResponseText(err.message, false)
        }

    }
}