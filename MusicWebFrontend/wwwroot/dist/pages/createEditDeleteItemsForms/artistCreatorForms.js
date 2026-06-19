var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mainURL } from "../../app.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization, ApiPutMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayArtistsPage } from "../displayItemsSubpages/artistSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { createArtistformFields } from "./formFieldsCreator.js";
import { formField, itemSharedForm } from "./ItemSharedForm.js";
const createArtistFormHeaderText = "Dodaj artystę";
const editArtistFormHeaderText = "Edycja artysty";
export function createArtist() {
    return __awaiter(this, void 0, void 0, function* () {
        const artistFormFields = createArtistformFields();
        const createArtistForm = new itemSharedForm(artistFormFields, null, null);
        createArtistForm.renderArtistForm(createArtistFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //onSave
            console.log("On save");
            const response = yield createArtistInApi(artistFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Artysta został dodany");
                yield displayArtistsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania artysty");
                console.log(statusCode, response.body);
            }
        }), () => {
            //onCancel
            console.log("Cancel");
            toast.info("Anulowano dodawanie artysty");
        });
    });
}
;
export function editArtist(artistId) {
    return __awaiter(this, void 0, void 0, function* () {
        const artistFormFields = createArtistformFields();
        yield updateFormFieldsValueFromCurrentArtistId(artistId, artistFormFields);
        const editArtistForm = new itemSharedForm(artistFormFields, null, artistId);
        editArtistForm.renderArtistForm(editArtistFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //onSave
            console.log("On save");
            const response = yield editArtistsInApi(artistId, artistFormFields);
            const statusCode = response.status;
            if (statusCode === 200) {
                toast.success("Artysta został zaaktualizowany");
                yield displayArtistsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania artysty");
                console.log(statusCode, response.body);
            }
        }), () => {
            //onCancel
            console.log("Cancel");
            toast.info("Anulowano dodawanie artysty");
        });
    });
}
function updateFormFieldsValueFromCurrentArtistId(artistId, artistFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = mainURL + "artist/" + artistId;
        const token = CurrentUser.token;
        const response = yield ApiGetMethodObjectDtoWithAuthorization(url, token);
        if (response.status === 200) {
            const artistDto = response.data;
            console.log(artistDto);
            //artistFormFields.forEach(field => field.fieldValue = artistDto[field.fieldId]);
            formField.getFormFieldsFromDto(artistDto, artistFormFields);
        }
    });
}
function createArtistInApi(artistFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const artistDto = formField.getDtoFromFormFields(artistFormFields);
        const url = mainURL + "artist";
        const token = CurrentUser.token;
        const response = yield ApiPostMethodObjectDtoWithAuthorization(url, artistDto, token);
        console.log(artistDto);
        return response;
    });
}
function editArtistsInApi(artistId, artistFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const artistDto = formField.getDtoFromFormFields(artistFormFields);
        const url = mainURL + "artist/" + artistId;
        const token = CurrentUser.token;
        const response = yield ApiPutMethodObjectDtoWithAuthorization(url, artistDto, token);
        console.log(artistDto);
        return response;
    });
}
//# sourceMappingURL=artistCreatorForms.js.map