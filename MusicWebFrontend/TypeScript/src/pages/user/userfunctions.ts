export let isUserLoggedIn = false;

export function loginUser() {
    //add user to session
    //implement loggin using session and communiation with api
    isUserLoggedIn = true;
}

export function logoutUser() {
    //remove user from session
    //implement loggin using session and communiation with api
    isUserLoggedIn = false;
}

export function getUserName() {
    //get user name from session
    //implement loggin using session and communiation with api
    return "Użytkowniku";
}
