import { UserLoginForm } from "./userLoginForm.js";
export let isUserLoggedIn = false;
export function loginUserBtnFunction() {
    //add user to session
    //implement loggin using session and communiation with api
    const userLoginForm = new UserLoginForm();
    userLoginForm.loginUser();
}
export function logoutUserBtnFunction() {
    //remove user from session
    //implement loggin using session and communiation with api
    const userLoginForm = new UserLoginForm();
    userLoginForm.logoutUser();
}
export function changePasswordBtnFunction() {
    //change password
    //implement loggin using session and communiation with api
}
export function changeSettingsBtnFunction() {
    //change settings
    //implement loggin using session and communiation with api
}
export function registerUserBtnFunction() {
    //register user
    //implement loggin using session and communiation with api
}
//# sourceMappingURL=userButtonFunctions.js.map