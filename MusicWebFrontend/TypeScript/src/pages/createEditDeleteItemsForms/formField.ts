export type formfieldValue = string | number | boolean | null;

export class formField {
    private _fieldId: string;
    private _isBiggerField: boolean;
    private _labelText: string;
    private _inputType: "text" | "password" | "email" | "number" | "date" | "checkbox" | "radio" | "textarea" | "select";
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
        let input = null;
        if (this._inputType === "textarea") {
            input = document.createElement("textarea");
            input.rows = 15;
        }
        else {
            input = document.createElement("input");
            input.type = this._inputType;
        }

        input.id = this._inputId;

        if (this._fieldValue)
            input.value = this._fieldValue.toString();
        if (this._required)
            input.required = true;

        div.appendChild(label);
        div.appendChild(input);
        return div;
    }

    returnUpdatedFormField(): formField {
        return new formField(this._fieldId, this._isBiggerField, this._labelText, this._inputType, this._inputId, this._fieldValue.toString(), this._required);
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
}
