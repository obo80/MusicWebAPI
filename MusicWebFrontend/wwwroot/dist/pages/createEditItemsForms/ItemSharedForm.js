import { createDivByClassName } from "../../Utils/helpers.js";
export class itemSharedForm {
    constructor(formFields, formClassName, id) {
        this.formFields = [];
        this.formFields = formFields;
        this.formClassName = formClassName;
        this.id = id;
    }
    renderArtistForm(headerText, onSave, onCancel) {
        //const headerText = "Edytuj artystę";
        const modalContainer = this.createModalOverlayContainer(headerText);
        document.body.appendChild(modalContainer);
        const form = modalContainer.querySelector("form");
        this.addEventListeners(form, onSave, onCancel);
    }
    renderAlbumForm(headerText, onSave, onCancel) {
        const modalContainer = this.createModalOverlayContainer(headerText);
        document.body.appendChild(modalContainer);
        const form = modalContainer.querySelector("form");
        this.addEventListeners(form, onSave, onCancel);
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
    addEventListeners(form, onSave, onCancel) {
        const confirmButton = form.querySelector("#confirmBtn");
        const cancelButton = form.querySelector("#cancelBtn");
        if (confirmButton) {
            confirmButton.addEventListener("click", (event) => {
                event.preventDefault();
                this.updateFieldsValue(form);
                onSave();
            });
        }
        //form.qu
        if (cancelButton) {
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                onCancel();
            });
        }
    }
    updateFieldsValue(form) {
        console.log("Getting updated data...");
        this.formFields.forEach(field => {
            const div = form.querySelector(`#${field.fieldId}`);
            if (div) {
                const input = div.querySelector("input");
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
export class formField {
    get fieldId() {
        return this._fieldId;
    }
    get fieldValue() {
        return this._fieldValue;
    }
    set fieldValue(value) {
        this._fieldValue = value;
    }
    constructor(fieldId, isBiggerField, labelText, inputType, inputId, fieldValue, required) {
        this._fieldId = fieldId;
        this._isBiggerField = isBiggerField;
        this._labelText = labelText;
        this._inputType = inputType;
        this._inputId = inputId;
        this._fieldValue = fieldValue;
        this._required = required;
    }
    createformFieldDiv() {
        const div = document.createElement("div");
        div.className = this._isBiggerField ? "big-form-field" : "form-field";
        div.id = this._fieldId;
        const label = document.createElement("label");
        label.textContent = this._labelText;
        label.htmlFor = this._inputId;
        const input = document.createElement("input");
        input.type = this._inputType;
        input.id = this._inputId;
        if (this._fieldValue)
            input.value = this._fieldValue;
        if (this._required)
            input.required = true;
        div.appendChild(label);
        div.appendChild(input);
        return div;
    }
    returnUpdatedFormField() {
        return new formField(this._fieldId, this._isBiggerField, this._labelText, this._inputType, this._inputId, this._fieldValue, this._required);
    }
}
//# sourceMappingURL=ItemSharedForm.js.map