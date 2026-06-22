//tutaj mam tworzyć inputy select z opcjami dla podanej tablicy i danego elementu Select jako argument
export { appendSelectOptionsFromSelectDto, resetSelect };
function appendSelectOptionsFromSelectDto(options, selectElement) {
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