import { mainURL } from "../../app.js";
import { LoginDto } from "../../DTO/UserDtos.js";
import { createDivByClassName } from "../../functions/helpers.js";
import { toast } from "../../functions/toast.js";
import { CurrentUser } from "./currentUser.js";
import { renderUserButton } from "./userButton.js";
import { UserPasswordChangeForm } from "./UserPasswordChangeForm.js";
import { UserRegisterForm } from "./userRegisterForm.js";


//let isLoginSuccess: boolean = false;


export class UserLoginForm
{
    private url = mainURL + "account/login";

    private isUserCurrentlyLogged: boolean = false;

    public async loginUser(): Promise<void> {

        const loginModal = this.createLoginForm();

        await this.loginFormEventListener(loginModal);

        const pageWrapper = document.body.querySelector(".page-wrapper");
        pageWrapper.appendChild(loginModal);

        //return this.isUserCurrentlyLogged;
    }

    // public getLoginSuccessInfo(): boolean {
    //     return this.isUserCurrentlyLogged;
    // }

    public logoutUser(): void {
        CurrentUser.logoutCurrentUser();
        renderUserButton();
        toast.info("Wylogowano.");
    }


    private createLoginForm(): HTMLDivElement {
        const headerText = "Logowanie";

        const overlay = createDivByClassName("modal-overlay");

        const modalContent = createDivByClassName("modal-content");
        const modalHeader = document.createElement("h2");
        modalHeader.textContent = headerText;
        modalContent.appendChild(modalHeader);

        const loginForm = document.createElement("form");
        loginForm.classList.add("user-form");
        loginForm.id = "loginForm";

        const emailLabel = document.createElement("label");
        emailLabel.textContent = "Email:";
        emailLabel.htmlFor = "email";
        loginForm.appendChild(emailLabel);

        const emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.id = "email";
        emailInput.required = true;
        loginForm.appendChild(emailInput);

        const passwordLabel = document.createElement("label");
        passwordLabel.textContent = "Hasło:";
        passwordLabel.htmlFor = "password";
        loginForm.appendChild(passwordLabel);

        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.id = "password";
        passwordInput.required = true;
        loginForm.appendChild(passwordInput);

        const loggingFormButtonsContainer: HTMLDivElement = createDivByClassName("user-buttons-container");

        loginForm.appendChild(loggingFormButtonsContainer);

        const loginButton = document.createElement("button");
        loginButton.type = "submit";
        loginButton.classList.add("confirm-btn");
        loginButton.id = "loginBtn";
        loginButton.textContent = "Zaloguj się";
        loggingFormButtonsContainer.appendChild(loginButton);

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.classList.add("cancel-btn");
        cancelButton.id = "cancelBtn";
        cancelButton.textContent = "Anuluj";
        loggingFormButtonsContainer.appendChild(cancelButton);

        const registerContainer = createDivByClassName("login-register-container");
        const registerHeader = createDivByClassName("login-register-header");
        registerHeader.textContent = "Nie masz jeszcze konta?";
        const registerButton = document.createElement("button");
        registerButton.type = "button";
        registerButton.classList.add("confirm-register-btn");
        registerButton.id = "loginRegisterBtn";
        registerButton.textContent = "Zarejestruj się";
        registerContainer.appendChild(registerHeader);
        registerContainer.appendChild(registerButton);
        loginForm.appendChild(registerContainer);

        const errorMsg = createDivByClassName("error-msg");
        errorMsg.id = "errorBox"
        loginForm.appendChild(errorMsg);

        modalContent.appendChild(loginForm);
        overlay.appendChild(modalContent);
        return overlay;
    }


    private async loginFormEventListener(loginModal: HTMLDivElement): Promise<void> {
        const form = loginModal.querySelector("#loginForm") as HTMLFormElement;
        const errorBox = loginModal.querySelector("#errorBox") as HTMLDivElement;
        const submitButton = form.querySelector("#loginBtn") as HTMLButtonElement;
        const cancelButton = form.querySelector("#cancelBtn") as HTMLButtonElement;
        const registerButton = form.querySelector("#loginRegisterBtn") as HTMLButtonElement;

        form.addEventListener("submit", async (e: Event) => {
            e.preventDefault();
            await this.loginEventHandler(form, loginModal, errorBox, submitButton);
        });
        cancelButton.addEventListener("click", () => {
            loginModal.remove();
        });

        registerButton.addEventListener("click", () => {
            console.log("Przekierowanie do strony rejestracji.");
            new UserRegisterForm().registerUser();
            //new UserPasswordChangeForm().changePassword();
            //consolelog await metoda do rejestracji w osobnej klasie
            
            loginModal.remove();
        });

    }

    private async loginEventHandler(form: HTMLFormElement, loginModal: HTMLDivElement, errorBox: HTMLDivElement, submitButton: HTMLButtonElement) {
        const email = form.querySelector("#email") as HTMLInputElement;
        const password = form.querySelector("#password") as HTMLInputElement;

        const loginDto: LoginDto = { email: email.value, password: password.value };

        try {
            const responseCode = await CurrentUser.loginCurrentUser(loginDto);

            if (responseCode === 200) {
                toast.success("Zalogowano.");
                loginModal.remove();                
                renderUserButton();
            }
            else if (responseCode === 400 || responseCode === 401) {
                toast.error("Bład logowania. Nieprawidłowy email lub hasło.", { duration: 7000 });
                errorBox.textContent = `Eroor: ${responseCode}. Nieprawidłowy email lub hasło.`;
                submitButton.disabled = false;
            }
            else {
                toast.error("Błąd serwera podczas próby logowania użytkownika.", { duration: 7000 });
                errorBox.textContent = `Eroor: ${responseCode}. Wystąpił błąd serwera.`;
                submitButton.disabled = false;
            }
        }
        catch (err: any) {
            toast.error("Błąd serwera podczas próby logowania użytkownika.", { duration: 7000 });
            errorBox.textContent = err.message || "Wystąpił błąd serwera.";
            submitButton.disabled = false;
            submitButton.textContent = "Zaloguj się";
        }
        //await new Promise(resolve => setTimeout(resolve, 1000)); return result;
    }


//     private async loginEventHandler2(form: HTMLFormElement, loginModal: HTMLDivElement, errorBox: HTMLDivElement, submitButton: HTMLButtonElement) {
//         console.log("start event listener dla formy logowania");
//         const email = form.querySelector("#email") as HTMLInputElement;
//         const password = form.querySelector("#password") as HTMLInputElement;

//         const loginDto: LoginDto = { email: email.value, password: password.value };
//         let result: boolean = false;

//         try {
//             const responseData = await ApiPostMethodObjectDto<LoginDto, string>(this.url, loginDto);
//             const responseCode = responseData.status;
//             //const success = true;
//             if (responseCode === 200) {
//                 this.isUserCurrentlyLogged = true;
//                 console.log("isLoginSuccess", this.isUserCurrentlyLogged);
//                 loginModal.remove();
//                 CurrentUser.
//                 CurrentUser.setAnyUserLoggingStatus(true); // ustawienie wartosci w CurrentUser.
//                 renderUserButton();
//                 result = true;
//             }
//             else if (responseCode === 400 || responseCode === 401) {
//                 this.isUserCurrentlyLogged = false;
//                 errorBox.textContent = `Eroor: ${responseCode}. Nieprawidłowy email lub hasło.`;
//                 submitButton.disabled = false;
//                 //submitButton.textContent = "Zaloguj się";
//             }
//             else {
//                 this.isUserCurrentlyLogged = false;
//                 //submitButton.textContent = "Zaloguj się";;
//                 errorBox.textContent = `Eroor: ${responseCode}. Wystąpił błąd serwera.`;
//                 submitButton.disabled = false;
//                 //submitButton.textContent = "Zaloguj się";
//             }
//         }
//         catch (err: any) {
//             errorBox.textContent = err.message || "Wystąpił błąd serwera.";
//             submitButton.disabled = false;
//             submitButton.textContent = "Zaloguj się";
//         }
//         //await new Promise(resolve => setTimeout(resolve, 1000)); return result;
//     }
// }
// }

    


    // private async loginFormHandling(loginModal: HTMLDivElement): Promise<void> {
    //     return new Promise((resolve) => {

    //         const form = loginModal.querySelector("#loginForm") as HTMLFormElement;
    //         const errorBox = loginModal.querySelector("#errorBox") as HTMLDivElement;
    //         const submitButton = form.querySelector("#loginBtn") as HTMLButtonElement;


    //         form.addEventListener("submit", async (e: Event) => {
    //             e.preventDefault();
    //             const email = form.querySelector("#email") as HTMLInputElement;
    //             const password = form.querySelector("#password") as HTMLInputElement;

    //             const loginDto: LoginDto = { email: email.value, password: password.value };

    //             try {
    //                 const responseCode = await loginUserToApi(this.url, loginDto);
    //                 //const success = true;

    //                 if (responseCode === 200) {
    //                     this.isUserCurrentlyLogged = true;
    //                     console.log("isLoginSuccess", this.isUserCurrentlyLogged);
    //                     loginModal.remove();
    //                     resolve();
    //                     //getUserButtonContainer();
    //                 }

    //                 else if (responseCode === 400 || responseCode === 401) {
    //                     this.isUserCurrentlyLogged = false;
    //                     errorBox.textContent = `Eroor: ${responseCode}. Nieprawidłowy email lub hasło.`;
    //                     submitButton.disabled = false;
    //                     //submitButton.textContent = "Zaloguj się";
    //                 }

    //                 else {
    //                     this.isUserCurrentlyLogged = false
    //                     //submitButton.textContent = "Zaloguj się";;
    //                     errorBox.textContent = `Eroor: ${responseCode}. Wystąpił błąd serwera.`;
    //                     submitButton.disabled = false;
    //                     //submitButton.textContent = "Zaloguj się";
    //                 }
    //             }
    //             catch (err: any) {
    //                 errorBox.textContent = err.message || "Wystąpił błąd serwera.";
    //                 submitButton.disabled = false;
    //                 submitButton.textContent = "Zaloguj się";
    //             }
    //         }, { once: true });

    //     });
    // }


}


