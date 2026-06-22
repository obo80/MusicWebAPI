export type formfieldValue = string | number | boolean | null;
export type formfieldType = "text" | "password" | "email" | "number" | "date" | "checkbox" | "radio" | "textarea" | "select";

export class formField {
    private _fieldId: string;
    private _isHidden: boolean = false;
    private _labelText: string;
    private _inputType: formfieldType;
    private _inputId: string;
    private _fieldValue: formfieldValue;
    private _required: boolean;

    get fieldId(): string {
        return this._fieldId;
    }
    get fieldValue(): formfieldValue {
        return this._fieldValue;
    }
    set fieldValue(value: string | null) {
        this._fieldValue = value;
    }

    get inputType(): formfieldType {
        return this._inputType;
    }

    constructor(fieldId: string, isHidden: boolean, labelText: string, inputType: "text" | "password" | "email" | "number" | "date" | "checkbox" | "radio" | "textarea" | "select", inputId: string, fieldValue: string | null, required: boolean) {
        this._fieldId = fieldId;
        this._isHidden = isHidden;
        this._labelText = labelText;
        this._inputType = inputType;
        this._inputId = inputId;
        this._fieldValue = fieldValue;
        this._required = required;
    }

    createInputElement__Factory(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
        if (this._inputType === "select") {
            const element = document.createElement("select");
            //<option value="red">Czerwony</option>
            element.innerHTML = `<option value="">\<--Wybierz--\></option>`;
            //element.id = this._inputId;
            return element;
        }
        else if (this._inputType === "textarea") {
            const element = document.createElement("textarea");
            element.rows = 15;
            //element.id = this._inputId;
            return element;
        }
        else {
            const element = document.createElement("input");
            element.type = this._inputType;
            //element.id = this._inputId;
            return element;
        }
    }


    createformFieldDiv(): HTMLDivElement {
        const div = document.createElement("div");
        if (this._isHidden) {
            div.style.display = "none";
        }
        div.id = this._fieldId;
        const label = document.createElement("label");
        label.textContent = this._labelText;
        label.htmlFor = this._inputId;
        const input = this.createInputElement__Factory();
        // if (this._inputType === "select") {
        //     input = document.createElement("select");
        //     console.log("tworze select dla " + this._fieldId);
        // }
        // if (this._inputType === "textarea") {
        //     input = document.createElement("textarea") as HTMLTextAreaElement;
        //     input.rows = 15;
        // }
        // else {
        //     input = document.createElement("input");
        //     input.type = this._inputType;
        // }

        input.id = this._inputId;

        if (this._fieldValue)
            input.value = this._fieldValue.toString();
        if (this._required)
            input.required = true;

        div.appendChild(label);
        div.appendChild(input);
        return div;
    }

    public returnUpdatedFormField(): formField {
        return new formField(this._fieldId, this._isHidden, this._labelText, this._inputType, this._inputId, this._fieldValue.toString(), this._required);
    }

    public static getDtoFromFormFields(formFields: formField[]) {
        const payload: Record<string, formfieldValue> = {};

        formFields.forEach(field => {
            let value = field.fieldValue;
            if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
                value = Number(value);
            }
            else if (value === 'null') value = null;
            else if (value === 'true') value = true;
            else if (value === 'false') value = false;
            else value = value;

            payload[field.fieldId] = value;
        })
        return payload;
    };

    public static getFormFieldsFromDto<T>(dto: T, formFields: formField[]) {
        formFields.forEach(field => {
            const value = dto[field.fieldId] as formfieldValue;
            field.fieldValue = value? value.toString(): null;
        });
    }

     public static getFieldValueByFieldId(fieldId: string, formFields: formField[]) {
         const field = formFields.find(field => field.fieldId === fieldId);
        return field ? field.fieldValue : null;
    }
}
