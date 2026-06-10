import { LoginDto } from "../../DTO/UserDtos.js";
import { loginUserToApi } from "../../functions/apiCommunication.js";
import { createDivByClassName } from "../../functions/helpers.js";
import { isUserLoggedIn } from "./userButtonFunctions.js";

//let isLoginSuccess: boolean = false;


export class UserLoginForm
{

    private isLoginSuccess: boolean = false;

    public showLoginModalForm(): void {
        console.log("showLoginModal");
        const loginModal = this.createLoginForm();

        this.loginFormHandling(loginModal);
        document.body.appendChild(loginModal);
    }

    public getLoginSuccessInfo(): boolean {
        return this.isLoginSuccess;
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

        const loginButton = document.createElement("button");
        loginButton.type = "submit";
        loginButton.classList.add("login-btn");
        loginButton.id = "loginBtn";
        loginButton.textContent = "Zaloguj";
        loginForm.appendChild(loginButton);

        const errorMsg = createDivByClassName("error-msg");
        errorMsg.id = "errorBox"
        loginForm.appendChild(errorMsg);

        modalContent.appendChild(loginForm);
        overlay.appendChild(modalContent);
        return overlay;
    }


    private loginFormHandling(loginModal: HTMLDivElement): void {
        const form = loginModal.querySelector("#loginForm") as HTMLFormElement;
        const errorBox = loginModal.querySelector("#errorBox") as HTMLDivElement;
        const submitButton = form.querySelector("#loginBtn") as HTMLButtonElement;


        form.addEventListener("submit", async (e: Event) => {
            e.preventDefault();
            const email = form.querySelector("#email") as HTMLInputElement;
            const password = form.querySelector("#password") as HTMLInputElement;

            const loginDto: LoginDto = { email: email.value, password: password.value };

            try {
                const success = await loginUserToApi(loginDto);
                //const success = true;

                if (success) {
                    loginModal.remove();
                    this.isLoginSuccess = true;
                }

            }
            catch (err: any) {
                errorBox.textContent = err.message || "Wystąpił błąd serwera.";
                submitButton.disabled = false;
                submitButton.textContent = "Zaloguj się";
            }
        });

    }
}


/*
export function showLoginModalForm(): void {
    console.log("showLoginModal");
    const loginModal = createLoginForm();

    loginFormHandling(loginModal);
    document.body.appendChild(loginModal);

}

export function getLoginSuccess(): boolean {
    return isLoginSuccess;
}


function loginFormHandling(loginModal: HTMLDivElement): void{
    const form = loginModal.querySelector("#loginForm") as HTMLFormElement;
    const errorBox = loginModal.querySelector("#errorBox") as HTMLDivElement;
    const submitButton = form.querySelector("#loginBtn") as HTMLButtonElement;
    

    form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const email = form.querySelector("#email") as HTMLInputElement;
        const password = form.querySelector("#password") as HTMLInputElement;

        const loginDto: LoginDto = { email: email.value, password: password.value };

        try {
            const success = await loginUserToApi(loginDto);
            //const success = true;

            if (success) {
                loginModal.remove();
                isLoginSuccess = true;
            }

        }
        catch (err: any) {
            errorBox.textContent = err.message || "Wystąpił błąd serwera.";
            submitButton.disabled = false;
            submitButton.textContent = "Zaloguj się";
        }
    });

}


function createLoginForm(): HTMLDivElement {
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

    const loginButton = document.createElement("button");
    loginButton.type = "submit";
    loginButton.classList.add("login-btn");
    loginButton.id = "loginBtn";
    loginButton.textContent = "Zaloguj";
    loginForm.appendChild(loginButton);    

    const errorMsg = createDivByClassName("error-msg");
    errorMsg.id = "errorBox"
    loginForm.appendChild(errorMsg);

    modalContent.appendChild(loginForm);
    overlay.appendChild(modalContent);
    return overlay;
}

*/

