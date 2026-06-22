//tutaj mam tworzyć inputy select z opcjami dla podanej tablicy i danego elementu Select jako argument

import { SelectOptionsDto } from "../../../DTO/CreateItemsDto";
export { appendSelectOptionsFromSelectDto, resetSelect };

function appendSelectOptionsFromSelectDto(options: SelectOptionsDto[], selectElement: HTMLSelectElement) {
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

export function markOptionSelected(select: HTMLSelectElement, value: string) {
    const options = select.querySelectorAll("option");
    options.forEach(option => {
        if (option.value === value) {
            option.selected = true;
            return;
        }
    });
}
