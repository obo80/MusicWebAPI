import { mainURL } from "../../app.js";
import { ArtistDto } from "../../DTO/ItemsDto.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization, ApiPutMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayArtistsPage } from "../displayItemsSubpages/artistSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { createArtistformFields } from "./formFieldsCreator.js";
import { formField, itemSharedForm } from "./ItemSharedForm.js";

interface CreateArtistDto {
    name: string;
    description: string;
}

const createArtistFormHeaderText = "Dodaj artystę";
const editArtistFormHeaderText = "Edycja artysty";

export async function createArtist() {
    const artistFormFields: formField[] = createArtistformFields();
    const createArtistForm = new itemSharedForm(artistFormFields, null, null);

    createArtistForm.renderArtistForm(
        createArtistFormHeaderText,
        async () => {
            //onSave
            console.log("On save");
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
            console.log("Cancel");
            toast.info("Anulowano dodawanie artysty")
        });
    
};
export async function editArtist(artistId: number) {
    const artistFormFields: formField[] = createArtistformFields();
    await updateFormFieldsValueFromCurrentArtistId(artistId, artistFormFields);
    const editArtistForm = new itemSharedForm(artistFormFields, null, artistId.toString());

    editArtistForm.renderArtistForm(
        editArtistFormHeaderText,
        async () => {
            //onSave
            console.log("On save");
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
            console.log("Cancel");
            toast.info("Anulowano dodawanie artysty")
        });
}

export async function deleteArtist(artistId: number) {
    if (confirm("Czy na pewno chcesz usunąć artystę?")) {
        console.log("Delete artist in progress");
    }
    // const url = mainURL + "artist/"+artistId;
    // const token = CurrentUser.token;
    // const response = await ApiDeleteMethodWithAuthorization(url, token);
    // console.log(response);}
}

async function updateFormFieldsValueFromCurrentArtistId(artistId: number, artistFormFields): Promise<void> {
    const url = mainURL + "artist/"+artistId;
    const token = CurrentUser.token;
    const response = await ApiGetMethodObjectDtoWithAuthorization<ArtistDto>(url, token);
    if (response.status === 200) {
        const artistDto = response.data as unknown as ArtistDto;
        console.log(artistDto);
        //artistFormFields.forEach(field => field.fieldValue = artistDto[field.fieldId]);
        formField.getFormFieldsFromDto<ArtistDto>(artistDto, artistFormFields);
    }

}

async function createArtistInApi(artistFormFields: formField[]) {
    const artistDto = formField.getDtoFromFormFields(artistFormFields) as unknown as CreateArtistDto;

    const url = mainURL + "artist";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization(url, artistDto, token);

    console.log(artistDto);
    return response;
}



async function editArtistsInApi(artistId: number, artistFormFields: formField[]) {
    const artistDto = formField.getDtoFromFormFields(artistFormFields) as unknown as CreateArtistDto;

    const url = mainURL + "artist/" + artistId.toString();
    const token = CurrentUser.token;
    const response = await ApiPutMethodObjectDtoWithAuthorization(url, artistDto, token);

    console.log(artistDto);
    return response;

}
