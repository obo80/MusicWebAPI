import { toast } from "../../functions/toast.js";
import { CurrentUser } from "./currentUser.js";
import { UserLoginForm } from "./userLoginForm.js";
import { UserPasswordChangeForm } from "./UserPasswordChangeForm.js";
import { UserRegisterForm } from "./userRegisterForm.js";

export let isUserLoggedIn: boolean = false;

export function loginUserBtnFunction(): void {

    //add user to session
    //implement loggin using session and communiation with api
    const userLoginForm = new UserLoginForm();
    userLoginForm.loginUser();
}

export function logoutUserBtnFunction():void {
    //remove user from session
    //implement loggin using session and communiation with api
    const userLoginForm = new UserLoginForm();
    userLoginForm.logoutUser();
}


export function changePasswordBtnFunction(): void {
    new UserPasswordChangeForm().changePassword();
    //change password
    //implement loggin using session and communiation with api
}

export function changeSettingsBtnFunction(): void {
    //change settings
    //implement loggin using session and communiation with api
}

export function registerUserBtnFunction(): void {
    new UserRegisterForm().registerUser();
    //register user
    //implement loggin using session and communiation with api
}




