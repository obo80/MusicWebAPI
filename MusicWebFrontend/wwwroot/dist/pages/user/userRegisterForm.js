var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createDivByClassName } from "../../Utils/helpers.js";
import { toast } from "../../Utils/toast.js";
import { CurrentUser } from "./currentUser.js";
import { UserLoginForm } from "./userLoginForm.js";
export class UserRegisterForm {
    registerUser() {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("registerUser class main method placeholder");
            const registerUserModal = this.createRegisterForm();
            yield this.registerUserEventListener(registerUserModal);
            const pageWrapper = document.body.querySelector(".page-wrapper");
            pageWrapper.appendChild(registerUserModal);
        });
    }
    registerUserEventListener(registerUserModal) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = registerUserModal.querySelector("#changePasswordForm");
            const errorBox = registerUserModal.querySelector("#errorBox");
            const submitButton = form.querySelector("#confirmBtn");
            const cancelButton = form.querySelector("#cancelBtn");
            form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield this.registerUserEventHandler(form, registerUserModal, errorBox, submitButton);
            }));
            cancelButton.addEventListener("click", () => {
                registerUserModal.remove();
            });
        });
    }
    registerUserEventHandler(form, registerUserModal, errorBox, submitButton) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = form.querySelector("#username");
            const email = form.querySelector("#email");
            const password = form.querySelector("#password");
            const confirmPassword = form.querySelector("#confirmPassword");
            const firstName = form.querySelector("#firstName");
            const lastName = form.querySelector("#lastName");
            const registerUserDto = { name: username.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value, firstName: firstName.value ? firstName.value : null, lastName: lastName.value ? lastName.value : null };
            try {
                if (password.value !== confirmPassword.value) {
                    toast.error("Hasła nie pasują do siebie.");
                    errorBox.textContent = "Hasła nie pasują do siebie.";
                    submitButton.disabled = false;
                    return;
                }
                console.log("Uruchomienie api rejestracji.");
                const status = yield CurrentUser.registerUserCurrentUser(registerUserDto);
                if (status === 201) {
                    toast.success("Zostałeś poprawnie zarejestrowany. Zaloguj się.", { duration: 7000 });
                    registerUserModal.remove();
                    this.redirectToLogin(username.value, email.value);
                }
                else if (status === 400) {
                    toast.error("Użytkownik o podanej nazwie juz istnieje.", { duration: 7000 });
                    errorBox.textContent = "Użytkownik o podanej nazwie lub email juz istnieje.";
                    submitButton.textContent = "Zarejestruj się";
                }
                else if (status === 500) {
                    toast.error("Błąd serwera podczas próby rejestracji użytkownika.", { duration: 7000 });
                }
            }
            catch (err) {
                toast.error("Błąd serwera podczas próby rejestracji użytkownika.", { duration: 7000 });
                errorBox.textContent = err.message || "Wystąpił błąd serwera.";
                submitButton.disabled = false;
                submitButton.textContent = "Zarejestruj się";
            }
        });
    }
    redirectToLogin(userName, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerText = `<p>Witaj, <span style = "font-weight: bolder">${userName}</span>.
                            <p style = "font-size: 20px">Dziękujemy za rejestracje. <br>Zaloguj się:</p>`;
            const userLoginForm = new UserLoginForm();
            yield userLoginForm.loginUser();
            const loginModal = document.body.querySelector(".modal-overlay");
            const header = loginModal.querySelector("h2");
            header.innerHTML = headerText;
            const emailInput = loginModal.querySelector("#email");
            emailInput.value = email;
            const registerContainer = loginModal.querySelector(".login-register-container");
            if (registerContainer) {
                registerContainer.style.display = "none";
            }
        });
    }
    createRegisterForm() {
        const headerText = "Rejestracja użytkownika";
        const overlay = createDivByClassName("modal-overlay");
        const modalContent = createDivByClassName("modal-content");
        const modalHeader = document.createElement("h2");
        modalHeader.textContent = headerText;
        modalContent.appendChild(modalHeader);
        const registerUserForm = document.createElement("form");
        registerUserForm.classList.add("user-form");
        registerUserForm.id = "changePasswordForm";
        const usernameLabel = document.createElement("label");
        usernameLabel.textContent = "Nazwa użytkownika:";
        usernameLabel.htmlFor = "username";
        registerUserForm.appendChild(usernameLabel);
        const usernameInput = document.createElement("input");
        usernameInput.type = "text";
        usernameInput.id = "username";
        usernameInput.required = true;
        registerUserForm.appendChild(usernameInput);
        const emailLabel = document.createElement("label");
        emailLabel.textContent = "Email:";
        emailLabel.htmlFor = "email";
        registerUserForm.appendChild(emailLabel);
        const emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.id = "email";
        emailInput.required = true;
        registerUserForm.appendChild(emailInput);
        const firstNameLabel = document.createElement("label");
        firstNameLabel.textContent = "Imię:";
        firstNameLabel.htmlFor = "firstName";
        registerUserForm.appendChild(firstNameLabel);
        const firstNameInput = document.createElement("input");
        firstNameInput.type = "text";
        firstNameInput.id = "firstName";
        //firstNameInput.required = true;
        registerUserForm.appendChild(firstNameInput);
        const lastNameLabel = document.createElement("label");
        lastNameLabel.textContent = "Nazwisko:";
        lastNameLabel.htmlFor = "lastName";
        registerUserForm.appendChild(lastNameLabel);
        const lastNameInput = document.createElement("input");
        lastNameInput.type = "text";
        lastNameInput.id = "lastName";
        //lastNameInput.required = true;
        registerUserForm.appendChild(lastNameInput);
        const passwordLabel = document.createElement("label");
        passwordLabel.textContent = "Hasło:";
        passwordLabel.htmlFor = "password";
        registerUserForm.appendChild(passwordLabel);
        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.id = "password";
        passwordInput.required = true;
        registerUserForm.appendChild(passwordInput);
        const confirmPasswordLabel = document.createElement("label");
        confirmPasswordLabel.textContent = "Potwierdź hasło:";
        confirmPasswordLabel.htmlFor = "confirmPassword";
        registerUserForm.appendChild(confirmPasswordLabel);
        const confirmPasswordInput = document.createElement("input");
        confirmPasswordInput.type = "password";
        confirmPasswordInput.id = "confirmPassword";
        confirmPasswordInput.required = true;
        registerUserForm.appendChild(confirmPasswordInput);
        const loggingFormButtonsContainer = createDivByClassName("user-buttons-container");
        registerUserForm.appendChild(loggingFormButtonsContainer);
        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.classList.add("confirm-btn");
        confirmButton.id = "confirmBtn";
        confirmButton.textContent = "Zarejestruj";
        loggingFormButtonsContainer.appendChild(confirmButton);
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.classList.add("cancel-btn");
        cancelButton.id = "cancelBtn";
        cancelButton.textContent = "Anuluj";
        loggingFormButtonsContainer.appendChild(cancelButton);
        const errorMsg = createDivByClassName("error-msg");
        errorMsg.id = "errorBox";
        registerUserForm.appendChild(errorMsg);
        modalContent.appendChild(registerUserForm);
        overlay.appendChild(modalContent);
        return overlay;
    }
}
//# sourceMappingURL=userRegisterForm.js.map