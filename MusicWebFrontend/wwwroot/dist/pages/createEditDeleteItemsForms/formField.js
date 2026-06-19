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
    returnUpdatedFormField() {
        return new formField(this._fieldId, this._isBiggerField, this._labelText, this._inputType, this._inputId, this._fieldValue.toString(), this._required);
    }
    static getDtoFromFormFields(formFields) {
        const payload = {};
        formFields.forEach(field => {
            let value = field.fieldValue;
            if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
                value = Number(value);
            }
            else if (value === 'null')
                value = null;
            else if (value === 'true')
                value = true;
            else if (value === 'false')
                value = false;
            else
                value = value;
            payload[field.fieldId] = value;
        });
        return payload;
    }
    ;
}
//# sourceMappingURL=formField.js.map