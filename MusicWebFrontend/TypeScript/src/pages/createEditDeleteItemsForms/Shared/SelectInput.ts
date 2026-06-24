//tutaj mam tworzyć inputy select z opcjami dla podanej tablicy i danego elementu Select jako argument

import { SelectOptionsDto } from "../../../DTO/CreateItemsDto.js";
import { formField } from "./formField.js";
import { getNumberIdByFieldId } from "./SharedFormsUtils.js";
export { appendSelectOptionsFromSelectDto, resetSelect };

function appendSelectOptionsFromSelectDto(options: SelectOptionsDto[], selectElement: HTMLSelectElement) {
    selectElement.innerHTML = "";
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value.toString();
        optionElement.textContent = option.text;
        selectElement.appendChild(optionElement);
    });
}

function appendSelectOptions(options: string[], selectElement: HTMLSelectElement) {
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.toString();
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

function resetSelect(select: HTMLSelectElement, defaultText: string) {
    select.innerHTML = `<option value="">${defaultText}</option>`;
}

export function markCurretnItemInSelect(itemIdFormFieldId: string, formFields: formField[], isDisabled: boolean) {
    const itemId = getNumberIdByFieldId(itemIdFormFieldId, formFields);
    const itemSelect = document.getElementById(itemIdFormFieldId) as HTMLSelectElement;

    if (isDisabled)
        itemSelect.disabled = true;

    markOptionSelected(itemSelect, itemId.toString());
}

export function markOptionSelected(select: HTMLSelectElement, value: string) {
    const options = select.querySelectorAll("option");
    options.forEach(option => {
        if (option.value === value) {
            option.selected = true;
            return;
        }
    });
}


