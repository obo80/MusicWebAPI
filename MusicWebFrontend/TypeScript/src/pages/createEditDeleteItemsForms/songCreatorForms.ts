import { mainURL } from "../../app.js";
import { CreateSongDto } from "../../DTO/CreateItemsDto.js";
import { SongDto } from "../../DTO/ItemsDto.js";
import { ApiPostMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displaySongsPage } from "../displayItemsSubpages/songSupbpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { createSongFormFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { getNumberIdByFieldId, updateAlbumsSelectOptions, updateArtistsSelectOptions } from "./Shared/SharedFormsUtils.js";

const createSongFormHeaderText = "Dodaj utwór";
const editSongFormHeaderText = "Edycja utworu";

const artistIdFormFieldId: string = "artistId";
const albumIdFormFieldId: string = "albumId";

export async function createSong() {
    console.log("Create song in progress");
    const songFormFields: formField[] = createSongFormFields();
    const songCreateForm = new itemSharedForm(songFormFields, null, null);


    await songCreateForm.renderSongForm(
        createSongFormHeaderText,
        async () => {
            //blokowanie i aktualizacja selecta albumu po wyborze artysty
            //dodać wywołanie jakiejś funkcji która sprawdza czy jest wybrany artysta i aktualizuje selecta albumu
            //i musi też w tym moim generyku zgadywać który select jest nasłuchiwany
            //dodać jeszcze jakąś blokadę tego selecta, żeby nie mogło być wybrany jesli nie jest wybrany artysta

            //on Save
            console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
            //const albumId = getNumberIdByFieldId(albumIdFormFieldId, songFormFields);
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
            console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        }

    );
    await updateArtistsSelectOptions(artistIdFormFieldId);
}

export async function editSong(songId: number) {
    console.log("Edit song in progress");
}

export async function deleteSong(songId: number) {
    if (confirm("Czy na pewno chcesz usunąć utwór?")) {
    console.log("Delete song in progress");
    }

}



async function createSongInApi(artistId: number, songFormFields: formField[]) {
    const songDto = formField.getDtoFromFormFields(songFormFields) as unknown as CreateSongDto;

    const url = mainURL + "artist/" + artistId.toString() + "/song";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization<CreateSongDto, SongDto>(url, songDto, token);

    console.log(songDto);
    return response;
}

export async function updateAlbumsSelectOptionsBySelectedArtist(currentFieldId : string, currentFieldValue: string) {
    if (currentFieldId != artistIdFormFieldId)
        return;
    else {
        await updateAlbumsSelectOptions(albumIdFormFieldId, Number(currentFieldValue))
    }

}
