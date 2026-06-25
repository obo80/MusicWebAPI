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
    get inputType() {
        return this._inputType;
    }
    constructor(fieldId, isHidden, labelText, inputType, inputId, fieldValue, required) {
        this._isHidden = false;
        this._fieldId = fieldId;
        this._isHidden = isHidden;
        this._labelText = labelText;
        this._inputType = inputType;
        this._inputId = inputId;
        this._fieldValue = fieldValue;
        this._required = required;
    }
    createInputElement__Factory() {
        if (this._inputType === "select") {
            const element = document.createElement("select");
            element.innerHTML = `<option value="">\<--Wybierz--\></option>`;
            return element;
        }
        else if (this._inputType === "textarea") {
            const element = document.createElement("textarea");
            element.rows = 15;
            return element;
        }
        else {
            const element = document.createElement("input");
            element.type = this._inputType;
            return element;
        }
    }
    createformFieldDiv() {
        const div = document.createElement("div");
        if (this._isHidden) {
            div.style.display = "none";
        }
        div.id = this._fieldId;
        const label = document.createElement("label");
        label.textContent = this._labelText;
        label.htmlFor = this._inputId;
        const input = this.createInputElement__Factory();
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
        return new formField(this._fieldId, this._isHidden, this._labelText, this._inputType, this._inputId, this._fieldValue.toString(), this._required);
    }
    static getDtoFromFormFields(formFields) {
        const payload = {};
        formFields.forEach(field => {
            let value = field.fieldValue;
            if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
                value = Number(value);
            }
            else if (value === 'undefined')
                value = null;
            else if (value === '')
                value = null;
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
        console.log("payload", payload);
        return payload;
    }
    ;
    static getFormFieldsFromDto(dto, formFields) {
        formFields.forEach(field => {
            const value = dto[field.fieldId];
            field.fieldValue = value ? value.toString() : null;
        });
    }
    static getFieldValueByFieldId(fieldId, formFields) {
        const field = formFields.find(field => field.fieldId === fieldId);
        return field ? field.fieldValue : null;
    }
}
//# sourceMappingURL=formField.js.map