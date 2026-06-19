import { mainURL } from "../../app.js";
import { CreateAlbumDto } from "../../DTO/CreateItemsDto.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayAlbumsPage } from "../displayItemsSubpages/albumSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { createAlbumformFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";


const createAlbumFormHeaderText = "Dodaj album";
const editAlbumFormHeaderText = "Edycja albumu";

export async function createAlbum() {
    console.log("Create album in progress");
    const albumFormFields: formField[] = createAlbumformFields();
    const createAlbumForm = new itemSharedForm(albumFormFields, null, null);
    const artistId = 2;
    createAlbumForm.renderAlbumForm(
        createAlbumFormHeaderText,
        async () => {
            //onSave
            console.log("On save");
            const response = await createAlbumInApi(artistId,albumFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Album został dodany");
                await displayAlbumsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania albumu");
                console.log(statusCode, response.body);
            }
        },
        () => {
            //onCancel
            console.log("Cancel");
            toast.info("Anulowano dodawanie albumu")
        }

    );
}

export async function editAlbum(albumId: number) {
    console.log("Edit album in progress");
}

export async function deleteAlbum(albumId: number) {
    if (confirm("Czy na pewno chcesz usunąć album?")) {
        console.log("Delete album in progress");
    }
}
async function getArtistsFronApi() {
    const url = mainURL + "artist";
    //to do
}

async function createAlbumInApi(artistId: number, artistFormFields: formField[]) {
    const artistDto = formField.getDtoFromFormFields(artistFormFields) as unknown as CreateAlbumDto;

    const url = mainURL + "artist" + artistId.toString() + "/album";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization(url, artistDto, token);

    console.log(artistDto);
    return response;
}