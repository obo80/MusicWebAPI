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

// function addEventListeners(selectElement: HTMLSelectElement, onChange: (event: Event) => void) {
//     selectElement.addEventListener("change", onChange);
// }

function resetSelect(select: HTMLSelectElement, defaultText: string) {
    select.innerHTML = `<option value="">${defaultText}</option>`;
}

