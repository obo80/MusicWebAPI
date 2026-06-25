import { createDivByClassName } from "../../../Utils/helpers.js";
import { updateAlbumsSelectOptionsBySelectedArtist } from "../songCreatorForms.js";
import { formField } from "./formField.js";

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
        const modalOverlayContainer = this.createModalOverlayContainer(headerText);

        document.body.appendChild(modalOverlayContainer);

        
        this.addFormButtonsEventListeners(modalOverlayContainer, onSave, onCancel);
    }

    async renderAlbumForm(headerText: string, onSave: () => void, onCancel: () => void) {
        const modalOverlayContainer = this.createModalOverlayContainer(headerText);

        document.body.appendChild(modalOverlayContainer);
       
        this.addFormButtonsEventListeners(modalOverlayContainer, onSave, onCancel);
        await this.addSelectChangeEventListeners(modalOverlayContainer);
    }

    async renderSongForm(headerText: string, onSave: () => void, onCancel: () => void) {
        const modalOverlayContainer = this.createModalOverlayContainer(headerText);

        document.body.appendChild(modalOverlayContainer);

        this.addFormButtonsEventListeners(modalOverlayContainer, onSave, onCancel);
        await this.addSelectChangeEventListeners(modalOverlayContainer);
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

    private addSelectChangeEventListeners(modalOverlayContainer: HTMLDivElement) {
        const form = modalOverlayContainer.querySelector("form") as HTMLFormElement;
        this.formFields.forEach(field => {
            if (field.inputType === "select") {
                const div = form.querySelector(`#${field.fieldId}`) as HTMLDivElement;
                const select = div.querySelector("select") as HTMLSelectElement;
                if (select) {
                    select.addEventListener("change", async () => {
                        field.fieldValue = select.value;
                        await updateAlbumsSelectOptionsBySelectedArtist(field.fieldId, field.fieldValue, false);
                    });
                }
            }
        });
    }


    private addFormButtonsEventListeners(modalOverlayContainer: HTMLDivElement, onSave: () => void, onCancel: () => void) {
        const form = modalOverlayContainer.querySelector("form") as HTMLFormElement;
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

        if (cancelButton) {
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                onCancel();
                modalOverlayContainer.remove();
                });
        }
    }

    private updateFieldsValue(form: HTMLFormElement) {
        this.formFields.forEach(field => {
            const div = form.querySelector(`#${field.fieldId}`) as HTMLDivElement;
            if (div) {
                const input = div.querySelector("input, textarea") as HTMLInputElement;
                if (input) {
                    const inputValue = input.value;
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



export { formField };
