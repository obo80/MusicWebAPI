import { mainURL } from "../../app.js";
import { CreateArtistDto } from "../../DTO/CreateItemsDto.js";
import { AlbumDto, ArtistDto, SongDto } from "../../DTO/ItemsDto.js";
import { ApiDeleteMethodWithAuthorization, ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization, ApiPutMethodObjectDtoWithAuthorization, IApiResponse } from "../../Infrastructure/ApiCommunication/apiHTTPMethods.js";
import { getItemsForUrl } from "../../Infrastructure/ApiCommunication/ApiItems.js";
import { toast } from "../../Utils/toast.js";
import { displayArtistsPage } from "../displayItemsSubpages/artistSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { createArtistFormFields } from "./Shared/formFieldsCreator.js";
import { formField, itemSharedForm } from "./Shared/ItemSharedForm.js";

const artistCreateFormHeaderText = "Dodaj artystę";
const artistEditFormHeaderText = "Edycja artysty";

export async function createArtist() {
    const artistFormFields: formField[] = createArtistFormFields();
    const artistCreateForm = new itemSharedForm(artistFormFields, null, null);

    await artistCreateForm.renderArtistForm(
        artistCreateFormHeaderText,
        async () => {
            //onSave
            //console.log("On save");
            const response = await createArtistInApi(artistFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Artysta został dodany");
                await displayArtistsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania artysty");
                console.log(statusCode, response.body);
            }
        },
        () => {
            //onCancel
            //console.log("on Cancel");
            toast.info("Anulowano dodawanie artysty")
        });
    
}

export async function editArtist(artistId: number) {
    const artistFormFields: formField[] = createArtistFormFields();
    await updateFormFieldsValueFromCurrentArtistId(artistId, artistFormFields);
    const artistEditForm = new itemSharedForm(artistFormFields, null, artistId.toString());

    artistEditForm.renderArtistForm(
        artistEditFormHeaderText,
        async () => {
            //onSave
            //console.log("On save");
            const response = await editArtistsInApi(artistId, artistFormFields); 
            const statusCode = response.status;
            if (statusCode === 200) {
                toast.success("Artysta został zaaktualizowany");
                await displayArtistsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania artysty");
                console.log(statusCode, response.body);
            }
        },
        () => {
            //onCancel
            //console.log("Cancel");
            toast.info("Anulowano edycje artysty")
        });
}

export async function deleteArtist(artistId: number) {

    if (confirm("Czy na pewno chcesz usunąć artystę?")) {

        console.log("Delete artist in progress");
        const artistIdUrl = mainURL + "artist/" + artistId.toString();
        const token = CurrentUser.token;

        // const artistSongUrl = artistIdUrl + "/song";
        // const artistAlbumUrl = artistIdUrl + "/album";

        const songs = await getItemsForUrl<SongDto>(artistIdUrl + "/song", token);
        const albums = await getItemsForUrl<AlbumDto>(artistIdUrl + "/album", token);

        if (songs !== null && songs.length > 0 && albums !== null && albums.length > 0) {
            alert("Artysta zawiera utwory i albumy, usuń je przed usunięciem artysty");
            toast.error("Artysta zawiera utwory i albumy, nie można usunąć artysty");
            return;
        }
        else if (songs !== null && songs.length > 0) {
            alert("Artysta zawiera utwory, usuń je przed usunięciem artysty");
            toast.error("Artysta zawiera utwory, nie można usunąć artysty");
            return;
        }
        else if (albums !== null && albums.length > 0) {
            alert("Artysta zawiera albumy, usuń je przed usunięciem artysty");
            toast.error("Artysta zawiera albumy, nie można usunąć artysty");
            return;
        }
        console.log("Usuwanie artysty");
        const response = await ApiDeleteMethodWithAuthorization(artistIdUrl, token);
        const statusCode = response.status;
        if (statusCode === 204) {
            toast.success("Artysta został usunięty");
            await displayArtistsPage();
        }
        else {
            toast.error("Wystąpił błąd podczas usuwania artysty");
            console.log(statusCode, response);
        }
        console.log(response);
    }
}

async function updateFormFieldsValueFromCurrentArtistId(artistId: number, artistFormFields): Promise<void> {
    const url = mainURL + "artist/"+artistId;
    const token = CurrentUser.token;
    const response = await ApiGetMethodObjectDtoWithAuthorization<ArtistDto>(url, token);
    if (response.status === 200) {
        const artistDto = response.data as unknown as ArtistDto;
        console.log(artistDto);
        formField.getFormFieldsFromDto<ArtistDto>(artistDto, artistFormFields);
    }

}

async function createArtistInApi(artistFormFields: formField[]):Promise<IApiResponse<ArtistDto>> {
    const artistDto = formField.getDtoFromFormFields(artistFormFields) as unknown as CreateArtistDto;

    const url = mainURL + "artist";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization<CreateArtistDto,ArtistDto>(url, artistDto, token);

    console.log(artistDto);
    return response;
}



async function editArtistsInApi(artistId: number, artistFormFields: formField[]) {
    const artistDto = formField.getDtoFromFormFields(artistFormFields) as unknown as CreateArtistDto;

    const url = mainURL + "artist/" + artistId.toString();
    const token = CurrentUser.token;
    const response = await ApiPutMethodObjectDtoWithAuthorization<CreateArtistDto, ArtistDto>(url, artistDto, token);

    console.log(artistDto);
    return response;

}
