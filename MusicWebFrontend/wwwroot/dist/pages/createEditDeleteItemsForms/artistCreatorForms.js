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
import { ApiDeleteMethodWithAuthorization, ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization, ApiPutMethodObjectDtoWithAuthorization } from "../../Infrastructure/ApiCommunication/apiHTTPMethods.js";
import { getItemsForUrl } from "../../Infrastructure/ApiCommunication/ApiItems.js";
import { toast } from "../../Utils/toast.js";
import { displayArtistsPage } from "../displayItemsSubpages/artistSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { createArtistFormFields } from "./Shared/formFieldsCreator.js";
import { formField, itemSharedForm } from "./Shared/ItemSharedForm.js";
const artistCreateFormHeaderText = "Dodaj artystę";
const artistEditFormHeaderText = "Edycja artysty";
export function createArtist() {
    return __awaiter(this, void 0, void 0, function* () {
        const artistFormFields = createArtistFormFields();
        const artistCreateForm = new itemSharedForm(artistFormFields, null, null);
        yield artistCreateForm.renderArtistForm(artistCreateFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //onSave
            //console.log("On save");
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
            //console.log("on Cancel");
            toast.info("Anulowano dodawanie artysty");
        });
    });
}
export function editArtist(artistId) {
    return __awaiter(this, void 0, void 0, function* () {
        const artistFormFields = createArtistFormFields();
        yield updateFormFieldsValueFromCurrentArtistId(artistId, artistFormFields);
        const artistEditForm = new itemSharedForm(artistFormFields, null, artistId.toString());
        artistEditForm.renderArtistForm(artistEditFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //onSave
            //console.log("On save");
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
            //console.log("Cancel");
            toast.info("Anulowano edycje artysty");
        });
    });
}
export function deleteArtist(artistId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (confirm("Czy na pewno chcesz usunąć artystę?")) {
            console.log("Delete artist in progress");
            const artistIdUrl = mainURL + "artist/" + artistId.toString();
            const token = CurrentUser.token;
            // const artistSongUrl = artistIdUrl + "/song";
            // const artistAlbumUrl = artistIdUrl + "/album";
            const songs = yield getItemsForUrl(artistIdUrl + "/song", token);
            const albums = yield getItemsForUrl(artistIdUrl + "/album", token);
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
            const response = yield ApiDeleteMethodWithAuthorization(artistIdUrl, token);
            const statusCode = response.status;
            if (statusCode === 204) {
                toast.success("Artysta został usunięty");
                yield displayArtistsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas usuwania artysty");
                console.log(statusCode, response);
            }
            console.log(response);
        }
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
        const url = mainURL + "artist/" + artistId.toString();
        const token = CurrentUser.token;
        const response = yield ApiPutMethodObjectDtoWithAuthorization(url, artistDto, token);
        console.log(artistDto);
        return response;
    });
}
//# sourceMappingURL=artistCreatorForms.js.map