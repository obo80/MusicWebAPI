//tutaj mam tworzyć inputy select z opcjami dla podanej tablicy i danego elementu Select jako argument
import { getNumberIdByFieldId } from "./SharedFormsUtils.js";
export { appendSelectOptionsFromSelectDto, resetSelect };
function appendSelectOptionsFromSelectDto(options, selectElement) {
    selectElement.innerHTML = "";
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value.toString();
        optionElement.textContent = option.text;
        selectElement.appendChild(optionElement);
    });
}
function appendSelectOptions(options, selectElement) {
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.toString();
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}
function resetSelect(select, defaultText) {
    select.innerHTML = `<option value="">${defaultText}</option>`;
}
export function markCurretnItemInSelect(itemIdFormFieldId, formFields, isDisabled) {
    const itemId = getNumberIdByFieldId(itemIdFormFieldId, formFields);
    const itemSelect = document.getElementById(itemIdFormFieldId);
    if (isDisabled)
        itemSelect.disabled = true;
    markOptionSelected(itemSelect, itemId.toString());
}
export function markOptionSelected(select, value) {
    const options = select.querySelectorAll("option");
    options.forEach(option => {
        if (option.value === value) {
            option.selected = true;
            return;
        }
    });
}
//# sourceMappingURL=SelectInput.js.map