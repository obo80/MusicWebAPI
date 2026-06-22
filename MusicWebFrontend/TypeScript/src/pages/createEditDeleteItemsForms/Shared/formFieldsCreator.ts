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

export function createArtistFormFields(): formField[]{
    const name = new formField("name", false, "Nazwa artysty", "text", "name-input", null, true);
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);

    const formFields: formField[] = [name, description];
    return formFields;
}

export function createAlbumFormFields(): formField[] {
    const artistId = new formField("artistId", false, "Artysta", "select", "artistId-select", null, true);
    const title = new formField("title", false, "Tytuł albumu", "text", "title-input", null, true);
    const releasedYear = new formField("releasedYear", false, "Rok wydania", "number", "releasedYear-input", null, false);
    //const genreId = new formField("genreId", false, "Gatunek", "select", "genreId-select", null, false);
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);

    const formFields: formField[] = [artistId, title, releasedYear, /*genreId,*/ description];
    return formFields;
}

export function createSongFormFields(): formField[] {
    const artistId = new formField("artistId", false, "Artysta", "select", "artistId-select", null, true);
    const albumId = new formField("albumId", false, "Artysta", "select", "albumId-select", null, false);
    const title = new formField("title", false, "Tytuł albumu", "text", "title-input", null, true);
    const length = new formField("title", false, "Tytuł albumu", "number", "title-input", null, false);
    const releasedYear = new formField("releasedYear", false, "Rok wydania", "number", "releasedYear-input", null, false); 
    const description = new formField("description", false, "Opis", "textarea", "description-input", null, false);

    const formFields: formField[] = [artistId, albumId, title, length, releasedYear, description];
    return formFields;
} 