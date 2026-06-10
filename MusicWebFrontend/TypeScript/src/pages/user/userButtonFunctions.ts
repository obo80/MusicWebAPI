import { UserLoginForm } from "./userLoginForm.js";

export let isUserLoggedIn: boolean = false;

export function loginUser(): void {

    //add user to session
    //implement loggin using session and communiation with api
    const userLoginForm = new UserLoginForm();

    userLoginForm.showLoginModalForm();

    isUserLoggedIn = userLoginForm.getLoginSuccessInfo()
    console.log("loginUser", isUserLoggedIn);
}

export function logoutUser():void {
    //remove user from session
    //implement loggin using session and communiation with api
    isUserLoggedIn = false;
}

export function getUserName(): string {
    //get user name from session
    //implement loggin using session and communiation with api
    return "Użytkowniku";
}

export function changePassword(): void {
    //change password
    //implement loggin using session and communiation with api
}

export function changeSettings() : void {
    //change settings
    //implement loggin using session and communiation with api
}

export function registerUser(): void {
    //register user
    //implement loggin using session and communiation with api
}




