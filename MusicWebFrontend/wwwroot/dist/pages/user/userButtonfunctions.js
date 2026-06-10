import { UserLoginForm } from "./userLoginForm.js";
export let isUserLoggedIn = false;
export function loginUser() {
    //add user to session
    //implement loggin using session and communiation with api
    const userLoginForm = new UserLoginForm();
    userLoginForm.showLoginModalForm();
    isUserLoggedIn = userLoginForm.getLoginSuccessInfo();
    console.log("loginUser", isUserLoggedIn);
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
export function changePassword() {
    //change password
    //implement loggin using session and communiation with api
}
export function changeSettings() {
    //change settings
    //implement loggin using session and communiation with api
}
export function registerUser() {
    //register user
    //implement loggin using session and communiation with api
}
//# sourceMappingURL=userButtonFunctions.js.map