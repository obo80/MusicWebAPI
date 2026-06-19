import { formField } from "./formField.js";
/*
export class formField {
    private _fieldId: string;
    private _isBiggerField: boolean;
    private _labelText: string;
    private _inputType: "text" | "password" | "email" | "number" | "date" | "checkbox" | "radio" | "textarea" | "select";
    private _inputId: string;
    private _fieldValue: formfieldValue;
    private _required: boolean;
    */
export function createArtistformFields() {
    const name = new formField("name", false, "Nazwa artysty", "text", "name", null, true);
    const description = new formField("description", false, "Opis", "textarea", "description", null, false);
    const formFields = [name, description];
    return formFields;
}
export function createAlbumformFields() {
    const artistId = new formField("artistId", false, "Artysta", "select", "artistId", null, true);
    const title = new formField("title", false, "Tytuł albumu", "text", "title", null, true);
    const releasedYear = new formField("releasedYear", false, "Rok wydania", "number", "releasedYear", null, false);
    const genreId = new formField("genreId", false, "Gatunek", "select", "genreId", null, false);
    const description = new formField("description", false, "Opis", "textarea", "description", null, false);
    const formFields = [artistId, title, releasedYear, genreId, description];
    return formFields;
}
//# sourceMappingURL=formFieldsCreator.js.map