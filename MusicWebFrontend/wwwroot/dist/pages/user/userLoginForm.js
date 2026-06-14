var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mainURL } from "../../app.js";
import { createDivByClassName } from "../../functions/helpers.js";
import { toast } from "../../functions/toast.js";
import { CurrentUser } from "./currentUser.js";
import { renderUserButton } from "./userButton.js";
import { UserRegisterForm } from "./userRegisterForm.js";
//let isLoginSuccess: boolean = false;
export class UserLoginForm {
    constructor() {
        this.url = mainURL + "account/login";
        this.isUserCurrentlyLogged = false;
    }
    loginUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const loginModal = this.createLoginForm();
            yield this.loginFormEventListener(loginModal);
            const pageWrapper = document.body.querySelector(".page-wrapper");
            pageWrapper.appendChild(loginModal);
        });
    }
    logoutUser() {
        CurrentUser.logoutCurrentUser();
        renderUserButton();
        toast.info("Wylogowano.");
    }
    createLoginForm() {
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
        const loggingFormButtonsContainer = createDivByClassName("user-buttons-container");
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
        errorMsg.id = "errorBox";
        loginForm.appendChild(errorMsg);
        modalContent.appendChild(loginForm);
        overlay.appendChild(modalContent);
        return overlay;
    }
    loginFormEventListener(loginModal) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = loginModal.querySelector("#loginForm");
            const errorBox = loginModal.querySelector("#errorBox");
            const submitButton = form.querySelector("#loginBtn");
            const cancelButton = form.querySelector("#cancelBtn");
            const registerButton = form.querySelector("#loginRegisterBtn");
            form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield this.loginEventHandler(form, loginModal, errorBox, submitButton);
            }));
            cancelButton.addEventListener("click", () => {
                loginModal.remove();
            });
            registerButton.addEventListener("click", () => {
                console.log("Przekierowanie do strony rejestracji.");
                new UserRegisterForm().registerUser();
                loginModal.remove();
            });
        });
    }
    loginEventHandler(form, loginModal, errorBox, submitButton) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = form.querySelector("#email");
            const password = form.querySelector("#password");
            const loginDto = { email: email.value, password: password.value };
            try {
                const responseCode = yield CurrentUser.loginCurrentUser(loginDto);
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
            catch (err) {
                toast.error("Błąd serwera podczas próby logowania użytkownika.", { duration: 7000 });
                errorBox.textContent = err.message || "Wystąpił błąd serwera.";
                submitButton.disabled = false;
                submitButton.textContent = "Zaloguj się";
            }
        });
    }
}
//# sourceMappingURL=userLoginForm.js.map