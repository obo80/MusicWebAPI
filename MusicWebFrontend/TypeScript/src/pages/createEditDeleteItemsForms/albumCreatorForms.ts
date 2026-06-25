import { mainURL } from "../../app.js"
import { CreateAlbumDto } from "../../DTO/CreateItemsDto.js";
import { AlbumDto } from "../../DTO/ItemsDto.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization, ApiPutMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayAlbumsPage } from "../displayItemsSubpages/albumSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { artistIdFormFieldId, createAlbumFormFields, editAlbumFormFields} from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { markOptionSelected } from "./Shared/SelectInput.js";
import { getNumberIdByFieldId, updateArtistsSelectOptions } from "./Shared/SharedFormsUtils.js";


const createAlbumFormHeaderText = "Dodaj album";
const editAlbumFormHeaderText = "Edycja albumu";

export async function createAlbum() {
    console.log("Create album in progress");
    const albumFormFields: formField[] = createAlbumFormFields();
    const albumCreateForm = new itemSharedForm(albumFormFields, null, null);


    await albumCreateForm.renderAlbumForm(
        createAlbumFormHeaderText,
        async () => {
            //onSave
            console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, albumFormFields);
            if (!artistId || artistId === 0) {
                toast.error("Wybierz artystę");
                return;
            }
            const response = await createAlbumInApi(artistId, albumFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Album został dodany");
                await displayAlbumsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania albumu");
                console.log(statusCode, response);
            }
        },
        () => {
            //onCancel
            console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        }

    );
    await updateArtistsSelectOptions(artistIdFormFieldId);

}



export async function editAlbum(albumId: number) {
    const albumFormFields: formField[] = editAlbumFormFields();
    await updateFormFieldsValueFromCurrentAlbumId(albumId, albumFormFields);
    const albumEditForm = new itemSharedForm(albumFormFields, null, null);

    albumEditForm.renderAlbumForm(
        editAlbumFormHeaderText,
        async () => {
            //onSave
            //console.log("On save");
            const artistId = getNumberIdByFieldId("artistId", albumFormFields);
            if (!artistId || artistId === 0) {
                toast.error("Wybierz artystę");
                return;
            }
            const response = await editAlbumInApi(albumId, artistId, albumFormFields);
            const statusCode = response.status;
            if (statusCode === 200) {
                toast.success("Album został zaktualizowany");
                await displayAlbumsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania albumu");
                console.log(statusCode, response);
            }
        },
        () => {
            //onCancel
            //console.log("onCancel");
            toast.info("Anulowano edycje albumu");
        }
    );
    await updateArtistsSelectOptions(artistIdFormFieldId);
}

function disableArtistSelect(artistIdFormFieldId: string) {
    const artistSelect = document.getElementById(artistIdFormFieldId) as HTMLSelectElement;
    artistSelect.disabled = true;
}
function markCurretnArtistInSelect(artistIdFormFieldId: string, albumFormFields: formField[]) {
    const artistId = getNumberIdByFieldId(artistIdFormFieldId, albumFormFields);
    const artistSelect = document.getElementById(artistIdFormFieldId) as HTMLSelectElement;
    artistSelect.disabled = true;
    markOptionSelected(artistSelect, artistId.toString());
}

export async function deleteAlbum(albumId: number) {
    if (confirm("Czy na pewno chcesz usunąć album?")) {
        console.log("Delete album in progress");
    }
}
async function updateFormFieldsValueFromCurrentAlbumId(albumId: number, albumFormFields: formField[]): Promise<void> {
    const url = mainURL + "album/" + albumId;
    const token = CurrentUser.token;
    const response = await ApiGetMethodObjectDtoWithAuthorization<AlbumDto>(url, token);
    if (response.status === 200) {
        const albumDto = response.data as unknown as AlbumDto;

        formField.getFormFieldsFromDto<AlbumDto>(albumDto, albumFormFields);
    }
}


async function createAlbumInApi(artistId: number, albumFormFields: formField[]) {
    const albumDto = formField.getDtoFromFormFields(albumFormFields) as unknown as CreateAlbumDto;

    const url = mainURL + "artist/" + artistId.toString() + "/album";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization<CreateAlbumDto, AlbumDto>(url, albumDto, token);

    console.log(albumDto);
    return response;
}



async function editAlbumInApi(albumId: number, artistId: number, albumFormFields: formField[]) {
    const albumDto = formField.getDtoFromFormFields(albumFormFields) as unknown as CreateAlbumDto;

    const url = mainURL + "artist/" + artistId.toString() + "/album/" + albumId.toString();
    const token = CurrentUser.token;
    const response = await ApiPutMethodObjectDtoWithAuthorization<CreateAlbumDto, AlbumDto>(url, albumDto, token);

    console.log(albumDto);
    return response;
}




