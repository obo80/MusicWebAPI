import { mainURL } from "../../app.js";
import { ApiPostMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayArtistsPage } from "../displayItemsSubpages/artistSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formfieldValue } from "./formField.js";
import { createArtistformFields } from "./formFieldsCreator.js";
import { formField, itemSharedForm } from "./ItemSharedForm.js";

interface CreateArtistDto {
    name: string;
    description: string;
}

const createArtistFormHeaderText = "Dodaj artystę";
const esitArtistFormHeaderText = "Dodaj artystę";

export async function createArtist() {
    const artistFormFields: formField[] = createArtistformFields();
    const createArtistForm = new itemSharedForm(artistFormFields, null, null);
    createArtistForm.renderArtistForm(createArtistFormHeaderText,
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

async function createArtistInApi(artistFormFields: formField[]) {
    const artistDto = formField.getDtoFromFormFields(artistFormFields) as unknown as CreateArtistDto;

    const url = mainURL + "artist";
    const token = CurrentUser.token;
    const response = await ApiPostMethodObjectDtoWithAuthorization(url, artistDto, token);

    console.log(artistDto);
    return response;
}



