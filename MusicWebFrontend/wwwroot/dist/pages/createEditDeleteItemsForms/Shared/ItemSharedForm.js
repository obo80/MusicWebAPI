import { createDivByClassName } from "../../../Utils/helpers.js";
import { formField } from "./formField.js";
export class itemSharedForm {
    constructor(formFields, formClassName, id) {
        this.formFields = [];
        this.formFields = formFields;
        this.formClassName = formClassName;
        this.id = id;
    }
    renderArtistForm(headerText, onSave, onCancel) {
        const modalOverlayContainer = this.createModalOverlayContainer(headerText);
        document.body.appendChild(modalOverlayContainer);
        this.addFormButtonsEventListeners(modalOverlayContainer, onSave, onCancel);
    }
    renderAlbumForm(headerText, onSave, onCancel) {
        const modalOverlayContainer = this.createModalOverlayContainer(headerText);
        document.body.appendChild(modalOverlayContainer);
        this.addFormButtonsEventListeners(modalOverlayContainer, onSave, onCancel);
        this.addSelectChangeEventListeners(modalOverlayContainer);
    }
    renderSongForm(headerText, onSave, onCancel) {
        const modalOverlayContainer = this.createModalOverlayContainer(headerText);
        document.body.appendChild(modalOverlayContainer);
        this.addFormButtonsEventListeners(modalOverlayContainer, onSave, onCancel);
        this.addSelectChangeEventListeners(modalOverlayContainer);
    }
    createModalOverlayContainer(headerText) {
        const overlay = createDivByClassName("modal-overlay");
        const modalContent = createDivByClassName("modal-content");
        const modalHeader = document.createElement("h2");
        modalHeader.textContent = headerText;
        modalContent.appendChild(modalHeader);
        const topContainer = createDivByClassName("top-container");
        topContainer.style.display = "none";
        modalContent.appendChild(topContainer);
        topContainer.style.height = "80px";
        topContainer.style.backgroundColor = "yellow";
        topContainer.textContent = "placeholder dla wyboru artysty i albumu";
        //form for dynamic items
        const form = this.createForm();
        modalContent.appendChild(form);
        overlay.appendChild(modalContent);
        return overlay;
    }
    createForm() {
        const form = document.createElement("form");
        if (this.formClassName)
            form.className = this.formClassName;
        if (this.id)
            form.id = this.id;
        //append items
        this.formFields.forEach(field => {
            form.appendChild(field.createformFieldDiv());
        });
        const buttonsContainer = this.createButtonsContainer();
        form.appendChild(buttonsContainer);
        return form;
    }
    addSelectChangeEventListeners(modalOverlayContainer) {
        const form = modalOverlayContainer.querySelector("form");
        this.formFields.forEach(field => {
            if (field.inputType === "select") {
                const div = form.querySelector(`#${field.fieldId}`);
                const select = div.querySelector("select");
                if (select) {
                    select.addEventListener("change", () => {
                        field.fieldValue = select.value;
                    });
                }
            }
        });
    }
    addFormButtonsEventListeners(modalOverlayContainer, onSave, onCancel) {
        const form = modalOverlayContainer.querySelector("form");
        const confirmButton = form.querySelector("#confirmBtn");
        const cancelButton = form.querySelector("#cancelBtn");
        if (confirmButton) {
            confirmButton.addEventListener("click", (event) => {
                event.preventDefault();
                this.updateFieldsValue(form);
                onSave();
                modalOverlayContainer.remove();
            });
        }
        //form.qu
        if (cancelButton) {
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                onCancel();
                modalOverlayContainer.remove();
            });
        }
    }
    updateFieldsValue(form) {
        console.log("Getting updated data...");
        this.formFields.forEach(field => {
            const div = form.querySelector(`#${field.fieldId}`);
            if (div) {
                const input = div.querySelector("input, textarea");
                if (input) {
                    field.fieldValue = input.value;
                }
            }
        });
    }
    createButtonsContainer() {
        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "form-buttons-container";
        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.classList.add("confirm-btn");
        confirmButton.id = "confirmBtn";
        confirmButton.textContent = "Zapisz";
        buttonsContainer.appendChild(confirmButton);
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.classList.add("cancel-btn");
        cancelButton.id = "cancelBtn";
        cancelButton.textContent = "Anuluj";
        buttonsContainer.appendChild(cancelButton);
        return buttonsContainer;
    }
}
export { formField };
//# sourceMappingURL=ItemSharedForm.js.map