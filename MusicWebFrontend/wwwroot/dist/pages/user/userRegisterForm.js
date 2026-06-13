var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createDivByClassName } from "../../functions/helpers.js";
export class UserRegisterForm {
    registerUser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("registerUser class main method placeholder");
            const registerUserModal = this.createRegisterForm();
            yield this.registerUserEventListener(registerUserModal);
            const pageWrapper = document.body.querySelector(".page-wrapper");
            pageWrapper.appendChild(registerUserModal);
        });
    }
    registerUserEventListener(registerUserModal) {
    }
    registerUserEventHandler(form, registerUserModal, errorBox, submitButton) {
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