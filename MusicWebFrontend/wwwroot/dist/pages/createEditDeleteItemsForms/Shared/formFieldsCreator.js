import { formField } from "./formField.js";
/*
export class formField {
    private _fieldId: string;
    private _isHidden: boolean;
    private _labelText: string;
    private _inputType: "text" | "password" | "email" | "number" | "date" | "checkbox" | "radio" | "textarea" | "select";
    private _inputId: string;
    private _fieldValue: formfieldValue;
    private _required: boolean;
    */
export const artistIdFormFieldId = "artistId";
export const albumIdFormFieldId = "albumId";
export function createArtistFormFields() {
    const name = new formField("name", false, "Nazwa artysty", "text", "name-input", null, true);
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);
    const formFields = [name, description];
    return formFields;
}
export function createAlbumFormFields() {
    const artistId = new formField(artistIdFormFieldId, false, "Artysta", "select", artistIdFormFieldId + "-select", null, true);
    const title = new formField("title", false, "Tytuł albumu", "text", "title-input", null, true);
    const releasedYear = new formField("releasedYear", false, "Rok wydania", "number", "releasedYear-input", null, false);
    //const genreId = new formField("genreId", false, "Gatunek", "select", "genreId-select", null, false);
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);
    const formFields = [artistId, title, releasedYear, /*genreId,*/ description];
    return formFields;
}
export function editAlbumFormFields() {
    const artistId = new formField(artistIdFormFieldId, true, "Artysta", "text", artistIdFormFieldId + "-input", null, true);
    const title = new formField("title", false, "Tytuł albumu", "text", "title-input", null, true);
    const releasedYear = new formField("releasedYear", false, "Rok wydania", "number", "releasedYear-input", null, false);
    //const genreId = new formField("genreId", false, "Gatunek", "select", "genreId-select", null, false);
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);
    const formFields = [artistId, title, releasedYear, /*genreId,*/ description];
    return formFields;
}
export function createSongFormFields() {
    const artistId = new formField(artistIdFormFieldId, false, "Artysta", "select", artistIdFormFieldId + "-select", null, true);
    const albumId = new formField(albumIdFormFieldId, false, "Album", "select", albumIdFormFieldId + "-select", null, false);
    const title = new formField("title", false, "Tytuł utworu", "text", "title-input", null, true);
    const length = new formField("lenght", false, "Długość utworu (w sekundach)", "number", "lenght-input", null, false);
    const releasedYear = new formField("releasedYear", false, "Rok wydania", "number", "releasedYear-input", null, false);
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);
    const formFields = [artistId, albumId, title, length, releasedYear, description];
    return formFields;
}
export function editSongFormFields() {
    const artistId = new formField(artistIdFormFieldId, true, "Artysta", "select", artistIdFormFieldId + "-select", null, true);
    const albumId = new formField(albumIdFormFieldId, false, "Album", "select", albumIdFormFieldId + "-select", null, false);
    const title = new formField("title", false, "Tytuł utworu", "text", "title-input", null, true);
    const length = new formField("lenght", false, "Długość utworu (w sekundach)", "number", "lenght-input", null, false);
    const releasedYear = new formField("releasedYear", false, "Rok wydania", "number", "releasedYear-input", null, false);
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);
    const formFields = [artistId, albumId, title, length, releasedYear, description];
    return formFields;
}
//# sourceMappingURL=formFieldsCreator.js.map