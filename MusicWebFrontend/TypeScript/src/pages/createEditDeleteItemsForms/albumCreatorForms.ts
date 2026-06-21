import { mainURL } from "../../app.js"
import { CreateAlbumDto, SelectOptionsDto } from "../../DTO/CreateItemsDto.js";
import { ArtistDto } from "../../DTO/ItemsDto.js";
import { PagedResultDto } from "../../DTO/PagedResultDto.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayAlbumsPage } from "../displayItemsSubpages/albumSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { createAlbumformFields, createArtistformFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { appendSelectOptionsFromSelectDto } from "./Shared/SelectInput.js";


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
    const artistSelectId = "artistId";
    await updateArtistsSelectOptions(artistSelectId);

}

export async function editAlbum(albumId: number) {
    console.log("Edit album in progress");
}

export async function deleteAlbum(albumId: number) {
    if (confirm("Czy na pewno chcesz usunąć album?")) {
        console.log("Delete album in progress");
    }
}
async function updateArtistsSelectOptions(selectQuerySelector: string) {
    const form = document.querySelector("form") as HTMLFormElement;
    const artistSelectElement = form.querySelector("select#artistId") as HTMLSelectElement;
    //const selectElement = document.querySelector(selectQuerySelector) ;

    //get artists from Api and set options in form
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

async function getAllArtistsFronApi(): Promise<ArtistDto[] | null> {
    const url = mainURL + "artist";
    const response = await ApiGetMethodObjectDtoWithAuthorization<PagedResultDto<ArtistDto>>(url, CurrentUser.token);
    if (response.status !== 200) return null;

    const artists = response.data.items as ArtistDto[];
    return artists;
}

async function createAlbumInApi(artistId: number, artistFormFields: formField[]) {
    const artistDto = formField.getDtoFromFormFields(artistFormFields) as unknown as CreateAlbumDto;

    const url = mainURL + "artist" + artistId.toString() + "/album";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization(url, artistDto, token);

    console.log(artistDto);
    return response;
}