import { mainURL } from "../../app.js";
import { CreateSongDto } from "../../DTO/CreateItemsDto.js";
import { SongDto } from "../../DTO/ItemsDto.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization, ApiPutMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displaySongsPage } from "../displayItemsSubpages/songSupbpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { albumIdFormFieldId, artistIdFormFieldId, createSongFormFields, editSongFormFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { markCurretnItemInSelect, markOptionSelected } from "./Shared/SelectInput.js";
import { getNumberIdByFieldId, updateAlbumsSelectOptions, updateArtistsSelectOptions } from "./Shared/SharedFormsUtils.js";

const createSongFormHeaderText = "Dodaj utwór";
const editSongFormHeaderText = "Edycja utworu";

export async function createSong() {
    console.log("Create song in progress");
    const songFormFields: formField[] = createSongFormFields();
    const songCreateForm = new itemSharedForm(songFormFields, null, null);


    await songCreateForm.renderSongForm(
        createSongFormHeaderText,
        async () => {
            //on Save
            //console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
            const response = await createSongInApi(artistId, songFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Utwór został dodany");
                await displaySongsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania utworu");
                console.log(statusCode, response);
            }
        },
        async () => {
            //on Cancel
            //console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        }
    );
    await updateArtistsSelectOptions(artistIdFormFieldId);



}

export async function editSong(songId: number) {
    console.log("Edit song in progress");
    const songFormFields: formField[] = editSongFormFields();
    await updateFormFieldsValueFromCurrentSongId(songId, songFormFields);
    const songEditForm = new itemSharedForm(songFormFields, null, null);

    await songEditForm.renderSongForm(
        editSongFormHeaderText,
        async () => {
            //on Save
            //console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
            const response = await editSongInApi(songId, artistId, songFormFields);
            const statusCode = response.status;
            if (statusCode === 200) {
                toast.success("Utwór został zaktualizowany");
                await displaySongsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas edycji utworu");
                console.log(statusCode, response);
            }
        },
        async () => {
            //on Cancel
            //console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        }
    );
    await updateArtistsSelectOptions(artistIdFormFieldId);

    const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
    await updateAlbumsSelectOptions(albumIdFormFieldId, artistId, false);
    markCurretnItemInSelect(albumIdFormFieldId, songFormFields, false);
}

export async function deleteSong(songId: number) {
    if (confirm("Czy na pewno chcesz usunąć utwór?")) {
    console.log("Delete song in progress");
    }

}

async function updateFormFieldsValueFromCurrentSongId(songId: number, songFormFields: formField[]): Promise<void> {
    const url = mainURL + "song/" + songId;
    const token = CurrentUser.token;
    const response = await ApiGetMethodObjectDtoWithAuthorization<SongDto>(url, token);
    if (response.status === 200) {
        const songDto = response.data as unknown as SongDto;

        formField.getFormFieldsFromDto<SongDto>(songDto, songFormFields);
    }
}

async function createSongInApi(artistId: number, songFormFields: formField[]) {
    const songDto = formField.getDtoFromFormFields(songFormFields) as unknown as CreateSongDto;
    const url = mainURL + "artist/" + artistId.toString() + "/song";
    const token = CurrentUser.token;

    const response = await ApiPostMethodObjectDtoWithAuthorization<CreateSongDto, SongDto>(url, songDto, token);

    return response;
}

async function editSongInApi(singId: number, artistId: number, songFormFields: formField[]) {
    const songDto = formField.getDtoFromFormFields(songFormFields) as unknown as CreateSongDto;

    //replace 0 with null
    songDto.albumId = songDto.albumId === 0 ? null : songDto.albumId;

    const url = mainURL + "artist/" + artistId.toString() + "/song/" + singId.toString();
    const token = CurrentUser.token;
    const response = await ApiPutMethodObjectDtoWithAuthorization<CreateSongDto, SongDto>(url, songDto, token);

    console.log(songDto);
    return response;
}

export async function updateAlbumsSelectOptionsBySelectedArtist(currentFieldId : string, currentFieldValue: string, isRequired: boolean) {
    if (currentFieldId != artistIdFormFieldId)
        return;
    else {
        await updateAlbumsSelectOptions(albumIdFormFieldId, Number(currentFieldValue), isRequired)
    }

}
