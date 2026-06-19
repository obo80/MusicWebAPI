import { formField } from "./formField.js";

export function createArtistformFields(): formField[]{
    const name = new formField("name", false, "Nazwa artysty", "text", "name", null, true);
    const description = new formField("description", false, "Opis", "textarea", "description", null, false);

    const formFields: formField[] = [name, description];
    return formFields;
}