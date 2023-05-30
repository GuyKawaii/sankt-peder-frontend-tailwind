async function fetchDataWithToken(url) {
    const options = {
        method: "GET",
        headers: { "Accept": "application/json" }
    };

    const token = localStorage.getItem("token");
    if (!token) {
        return { success: false, message: "You must login to use this feature" };
    }

    options.headers.Authorization = "Bearer " + token;

    try {
        const res = await fetch(url, options).then(handleHttpErrors);
        return { success: true, data: res };
    } catch (err) {
        if (err.apiError) {
            return { success: false, message: err.apiError.message };
        } else {
            return { success: false, message: err.message };
        }
    }
}

async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message);
        error.apiError = errorResponse;
        throw error;
    }
    return res.json();
}


async function exampleUsage() {
    const result = await fetchDataWithToken("http://localhost:8080/menu/1");

    if (result.success) {
        console.log("Data:", result.data);
    } else {
        console.error("Error:", result.message);
    }
}

async function printMenuData() {
    const endpoint = "http://localhost:8080/menu/1";
    const result = await fetchDataWithToken(endpoint);

    console.log("here we are BEFORE");
    if (result.success) {

        console.log("Menu data:", result.data);
    } else {
        console.error("Error:", result.message);
    }
    console.log("here we are AFTER");
}

