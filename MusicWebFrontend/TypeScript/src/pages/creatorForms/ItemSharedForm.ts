import { createDivByClassName } from "../../Utils/helpers.js";

export class itemSharedForm {
    private formFields: formField[] = [];
    private formClassName: string | null;
    private id: string | null;

    constructor(formFields: formField[], formClassName: string | null, id: string | null) {
        this.formFields = formFields;
        this.formClassName = formClassName;
        this.id = id;
    }

    renderArtistForm(headerText: string, onSave: () => void, onCancel: () => void): void {
        //const headerText = "Edytuj artystę";
        const modalContainer = this.createModalOverlayContainer(headerText);

        document.body.appendChild(modalContainer);

        const form = modalContainer.querySelector("form") as HTMLFormElement;
        this.addEventListeners(form, onSave, onCancel);
    }

    renderAlbumForm(headerText: string, onSave: () => void, onCancel: () => void) {
        const modalContainer = this.createModalOverlayContainer(headerText);

        document.body.appendChild(modalContainer);

        const form = modalContainer.querySelector("form") as HTMLFormElement;
        this.addEventListeners(form, onSave, onCancel);
    }

    
    private createModalOverlayContainer(headerText: string): HTMLDivElement {
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


    private createForm(): HTMLFormElement {
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


    private addEventListeners(form: HTMLFormElement, onSave: () => void, onCancel: () => void) {
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

    private updateFieldsValue(form: HTMLFormElement) {
        console.log("Getting updated data...");
        this.formFields.forEach(field => {
            const div = form.querySelector(`#${field.fieldId}`) as HTMLDivElement;
            if (div) {
                const input = div.querySelector("input") as HTMLInputElement;
                if (input) {
                    field.fieldValue = input.value;
                }
            }
        });
    }


    private createButtonsContainer(): HTMLDivElement {
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
    private _fieldId: string;
    private _isBiggerField: boolean;
    private _labelText: string;
    private _inputType: "text" | "password" | "email" | "number" | "date" | "checkbox" | "radio" | "textarea" | "select";
    private _inputId: string;
    private _fieldValue: string | null;
    private _required: boolean;

    get fieldId(): string {
        return this._fieldId;
    }
    get fieldValue(): string | null {
        return this._fieldValue;
    }
    set fieldValue(value: string | null) {
        this._fieldValue = value;
    }

    constructor(fieldId: string, isBiggerField: boolean, labelText: string, inputType: "text" | "password" | "email" | "number" | "date" | "checkbox" | "radio" | "textarea" | "select", inputId: string, fieldValue: string | null, required: boolean) {
        this._fieldId = fieldId;
        this._isBiggerField = isBiggerField;
        this._labelText = labelText;
        this._inputType = inputType;
        this._inputId = inputId;
        this._fieldValue = fieldValue;
        this._required = required;
    }

    createformFieldDiv(): HTMLDivElement {
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

    returnUpdatedFormField(): formField {
        return new formField(this._fieldId, this._isBiggerField, this._labelText, this._inputType, this._inputId, this._fieldValue, this._required);
    }
}

