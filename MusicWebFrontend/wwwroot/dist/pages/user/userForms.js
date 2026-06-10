var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loginUserToApi } from "../../functions/apiCommunication.js";
import { createDivByClassName } from "../../functions/helpers.js";
export function showLoginModalForm() {
    console.log("showLoginModal");
    const loginModal = createLoginForm();
    const isLoginSuccess = loginFormHandling(loginModal);
    document.body.appendChild(loginModal);
    return isLoginSuccess;
}
function loginFormHandling(loginModal) {
    const form = loginModal.querySelector("#loginForm");
    const errorBox = loginModal.querySelector("#errorBox");
    const submitButton = form.querySelector("#loginBtn");
    let isLoginSuccess = false;
    form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const email = form.querySelector("#email");
        const password = form.querySelector("#password");
        const loginDto = { email: email.value, password: password.value };
        try {
            const success = yield loginUserToApi(loginDto);
            //const success = true;
            if (success) {
                loginModal.remove();
                isLoginSuccess = true;
            }
        }
        catch (err) {
            errorBox.textContent = err.message || "Wystąpił błąd serwera.";
            submitButton.disabled = false;
            submitButton.textContent = "Zaloguj się";
        }
    }));
    return isLoginSuccess;
}
function createLoginForm() {
    const headerText = "Logowanie";
    const overlay = createDivByClassName("modal-overlay");
    const modalContent = createDivByClassName("modal-content");
    const modalHeader = document.createElement("h2");
    modalHeader.textContent = headerText;
    modalContent.appendChild(modalHeader);
    const loginForm = document.createElement("form");
    loginForm.classList.add("login-form");
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
    errorMsg.id = "errorBox";
    loginForm.appendChild(errorMsg);
    modalContent.appendChild(loginForm);
    overlay.appendChild(modalContent);
    return overlay;
}
// function createUserModal(headerText: string, contentForm: HTMLFormElement ): HTMLDivElement {
//     const overlay = createDivByClassName("modal-overlay");
//     const modalContent = createDivByClassName("modal-content");
//     const modalHeader = document.createElement("h2");
//     modalHeader.textContent = headerText;
//     modalContent.appendChild(modalHeader);
//     modalContent.appendChild(contentForm);
//     overlay.appendChild(modalContent);
//     return overlay;
// }
//# sourceMappingURL=userForms.js.map