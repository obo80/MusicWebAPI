import { formField } from "./formField.js";
export function createArtistformFields() {
    const name = new formField("name", false, "Nazwa artysty", "text", "name", null, true);
    const description = new formField("description", false, "Opis", "textarea", "description", null, false);
    const formFields = [name, description];
    return formFields;
}
//# sourceMappingURL=formFieldsCreator.js.map