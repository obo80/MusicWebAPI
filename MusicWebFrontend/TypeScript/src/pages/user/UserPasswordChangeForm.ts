import { createDivByClassName } from "../../Utils/helpers.js";
import { toast } from "../../Utils/toast.js";
import { CurrentUser } from "./currentUser.js";
import { renderUserButton } from "./userButton.js";

export class UserPasswordChangeForm {
    public async changePassword(): Promise<void> {
        console.log("changePassword class main method placeholder");
        const changePasswordModal = this.createChangePasswordForm();

        await this.changePasswordEventListener(changePasswordModal);

        const pageWrapper = document.body.querySelector(".page-wrapper");
        pageWrapper.appendChild(changePasswordModal);

    }
    private async changePasswordEventListener(changePasswordModal: HTMLDivElement) {
        const form = changePasswordModal.querySelector("#changePasswordForm") as HTMLFormElement;
        const errorBox = changePasswordModal.querySelector("#errorBox") as HTMLDivElement;
        const submitButton = form.querySelector("#confirmBtn") as HTMLButtonElement;
        const cancelButton = form.querySelector("#cancelBtn") as HTMLButtonElement;

        form.addEventListener("submit", async (e: Event) => {
            e.preventDefault();
            await this.changePasswordEventHandler(form, changePasswordModal, errorBox, submitButton);
        });
        cancelButton.addEventListener("click", () => {
            changePasswordModal.remove();

        });
    }
    private async changePasswordEventHandler(form: HTMLFormElement, changePasswordModal: HTMLDivElement, errorBox: HTMLDivElement, submitButton: HTMLButtonElement) {

        const password = form.querySelector("#password") as HTMLInputElement;
        const newPassword = form.querySelector("#newPassword") as HTMLInputElement;
        const confirmPassword = form.querySelector("#confirmPassword") as HTMLInputElement;
        submitButton.disabled = true;

        const passwordDto = { password: password.value, newPassword: newPassword.value, confirmPassword: confirmPassword.value };

        try {
            if (newPassword.value !== confirmPassword.value) {
                toast.error("Hasła nie pasują do siebie.");
                errorBox.textContent = "Hasła nie pasują do siebie.";
                submitButton.disabled = false;
                return;
            }
            const status = await CurrentUser.changePasswordCurrentUser(passwordDto);
 
                if (status === 200) {
                    changePasswordModal.remove();
                    toast.success("Hasło zostało zmienione.");
                    // alert("Hasło zostało zmienione. Zaloguj się ponownie.");
                    renderUserButton();
                }
                else if (status === 400 || status === 401) {
                    toast.error("Nieprawidłowe hasło.");
                    errorBox.textContent = `Eroor: ${status}. Nieprawidłowe hasło.`;
                    submitButton.disabled = false;
                }
                else {
                    toast.error("Wystąpił błąd serwera.");
                    errorBox.textContent = `Eroor: ${status}. Wystąpił błąd serwera.`;
                    submitButton.disabled = false;
                }
            }
        catch (err: any) {
            toast.error("Wystąpił błąd serwera.");
            errorBox.textContent = err.message || "Wystąpił błąd serwera.";
            submitButton.disabled = false;
            submitButton.textContent = "Potwierdz zmianę hasła";
        }
    }


    private createChangePasswordForm(): HTMLDivElement {
        const headerText = "Zmiana hasła";

        const overlay = createDivByClassName("modal-overlay");

        const modalContent = createDivByClassName("modal-content");
        const modalHeader = document.createElement("h2");
        modalHeader.textContent = headerText;
        modalContent.appendChild(modalHeader);

        const changePasswordForm = document.createElement("form");
        changePasswordForm.classList.add("user-form");
        changePasswordForm.id = "changePasswordForm";

        // const emailLabel = document.createElement("label");
        // emailLabel.textContent = "Email:";
        // emailLabel.htmlFor = "email";
        // changePasswordForm.appendChild(emailLabel);

        // const emailInput = document.createElement("input");
        // emailInput.type = "email";
        // emailInput.id = "email";
        // emailInput.required = true;
        // changePasswordForm.appendChild(emailInput);

        const passwordLabel = document.createElement("label");
        passwordLabel.textContent = "Aktualne hasło:";
        passwordLabel.htmlFor = "password";
        changePasswordForm.appendChild(passwordLabel);

        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.id = "password";
        passwordInput.required = true;
        changePasswordForm.appendChild(passwordInput);

        const newPasswordLabel = document.createElement("label");
        newPasswordLabel.textContent = "Nowe hasło:";
        newPasswordLabel.htmlFor = "newPassword";
        changePasswordForm.appendChild(newPasswordLabel);

        const newPasswordInput = document.createElement("input");
        newPasswordInput.type = "password";
        newPasswordInput.id = "newPassword";
        newPasswordInput.required = true;
        changePasswordForm.appendChild(newPasswordInput);

        const confirmPasswordLabel = document.createElement("label");
        confirmPasswordLabel.textContent = "Potwierdź nowe hasło:";
        confirmPasswordLabel.htmlFor = "confirmPassword";
        changePasswordForm.appendChild(confirmPasswordLabel);

        const confirmPasswordInput = document.createElement("input");
        confirmPasswordInput.type = "password";
        confirmPasswordInput.id = "confirmPassword";
        confirmPasswordInput.required = true;
        changePasswordForm.appendChild(confirmPasswordInput);

        const loggingFormButtonsContainer: HTMLDivElement = createDivByClassName("user-buttons-container");

        changePasswordForm.appendChild(loggingFormButtonsContainer);

        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.classList.add("confirm-btn");
        confirmButton.id = "confirmBtn";
        confirmButton.textContent = "Potwierdz zmianę hasła";
        loggingFormButtonsContainer.appendChild(confirmButton);

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.classList.add("cancel-btn");
        cancelButton.id = "cancelBtn";
        cancelButton.textContent = "Anuluj";
        loggingFormButtonsContainer.appendChild(cancelButton);

        const errorMsg = createDivByClassName("error-msg");
        errorMsg.id = "errorBox"
        changePasswordForm.appendChild(errorMsg);

        modalContent.appendChild(changePasswordForm);
        overlay.appendChild(modalContent);
        return overlay;
    }
}