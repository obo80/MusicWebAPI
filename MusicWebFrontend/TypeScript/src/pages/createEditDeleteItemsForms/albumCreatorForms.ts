import { mainURL } from "../../app.js"
import { CreateAlbumDto, SelectOptionsDto } from "../../DTO/CreateItemsDto.js";
import { ApiPostMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayAlbumsPage } from "../displayItemsSubpages/albumSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { createAlbumFormFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { getNumberIdByFieldId, updateArtistsSelectOptions } from "./Shared/SharedFormsUtils.js";


const createAlbumFormHeaderText = "Dodaj album";
const editAlbumFormHeaderText = "Edycja albumu";

export async function createAlbum() {
    console.log("Create album in progress");
    const albumFormFields: formField[] = createAlbumFormFields();
    const albumCreateForm = new itemSharedForm(albumFormFields, null, null);
    const artistIdFormFieldId = "artistId";
    // let artistId = 2;

    albumCreateForm.renderAlbumForm(
        createAlbumFormHeaderText,
        async () => {
            //onSave
            console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, albumFormFields);
            console.log(artistId);
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
    console.log("Edit album in progress");
}

export async function deleteAlbum(albumId: number) {
    if (confirm("Czy na pewno chcesz usunąć album?")) {
        console.log("Delete album in progress");
    }
}



async function createAlbumInApi(artistId: number, albumFormFields: formField[]) {
    const artistDto = formField.getDtoFromFormFields(albumFormFields) as unknown as CreateAlbumDto;

    const url = mainURL + "artist/" + artistId.toString() + "/album";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization(url, artistDto, token);

    console.log(artistDto);
    return response;
}