import { mainURL } from "../../../app.js";
import { SelectOptionsDto } from "../../../DTO/CreateItemsDto.js";
import { AlbumDto, ArtistDto } from "../../../DTO/ItemsDto.js";
import { PagedResultDto } from "../../../DTO/PagedResultDto.js";
import { ApiGetMethodObjectDtoWithAuthorization } from "../../../Utils/apiCommunication.js";
import { CurrentUser } from "../../user/currentUser.js";
import { formField, formfieldValue } from "./formField.js";
import { appendSelectOptionsFromSelectDto } from "./SelectInput.js";


export function getFormFieldsFromDto<T>(dto: T, formFields: formField[]) {
formFields.forEach(field => {
    const value = dto[field.fieldId] as formfieldValue;
    field.fieldValue = value ? value.toString() : null;
});
}

export function getFieldValueByFieldId(fieldId: string, formFields: formField[]) {
const field = formFields.find(field => field.fieldId === fieldId);
return field ? field.fieldValue : null;
}

export function getNumberIdByFieldId(fieldId: string, formFields: formField[]) {
const field = formFields.find(field => field.fieldId === fieldId);
return field ? Number(field.fieldValue) : null;
}

export async function updateArtistsSelectOptions(artistIdFormFieldId: string) {
    const form = document.querySelector("form") as HTMLFormElement;
    const div = form.querySelector(`#${artistIdFormFieldId}`) as HTMLDivElement;
    if (div !== null) {
    const artistSelectElement = div.querySelector("select") as HTMLSelectElement;
        const artists = await getAllArtistsFronApi();

        const SelectOptions: SelectOptionsDto[] = [];
        artists?.forEach(artist => {
            const SelectOption: SelectOptionsDto = { value: artist.id, text: artist.name };
            SelectOptions.push(SelectOption);
        });
        if (SelectOptions.length === 0) return;
        if (artistSelectElement === null) return;
        appendSelectOptionsFromSelectDto(SelectOptions, artistSelectElement);
    }
} 

export async function updateAlbumsSelectOptions(albumsIdFormFieldId: string, artistId: number, isRequired: boolean) {
    const form = document.querySelector("form") as HTMLFormElement;
    const div = form.querySelector(`#${albumsIdFormFieldId}`) as HTMLDivElement;
    if (div !== null) {
        const albumsSelectElement = div.querySelector("select") as HTMLSelectElement;
        const albums = await getAlbumsByArtistId(artistId);

        const SelectOptions: SelectOptionsDto[] = [];
        if (isRequired === false)
            SelectOptions.push({ value: 0, text: "--Brak albumu--" });

        albums?.forEach(album => {
            const SelectOption: SelectOptionsDto = { value: album.id, text: album.title };
            SelectOptions.push(SelectOption);
        });
        if (SelectOptions.length === 0) return;
        if (albumsSelectElement === null) return;
        appendSelectOptionsFromSelectDto(SelectOptions, albumsSelectElement);
    }
} 


async function getAllArtistsFronApi(): Promise<ArtistDto[] | null> {
    const url = mainURL + "artist";
    const response = await ApiGetMethodObjectDtoWithAuthorization<PagedResultDto<ArtistDto>>(url, CurrentUser.token);
    if (response.status !== 200) return null;

    const artists = response.data.items as ArtistDto[];
    return artists;
}

async function getAlbumsByArtistId(artistId: number): Promise<AlbumDto[] | null> {
    const url = mainURL + "artist/" + artistId.toString() + "/album";
    const response = await ApiGetMethodObjectDtoWithAuthorization<PagedResultDto<AlbumDto>>(url, CurrentUser.token);
    if (response.status !== 200) return null;

    const albums = response.data.items as AlbumDto[];
    return albums;
}

