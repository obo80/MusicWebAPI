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
import { getItemFieldValue, getItemsForUrl } from "../../Infrastructure/ApiCommunication/ApiItems.js";
import { toast } from "../../Utils/toast.js";
import { displayAlbumsPage } from "../displayItemsSubpages/albumSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { artistIdFormFieldId, createAlbumFormFields, editAlbumFormFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { getNumberIdByFieldId, updateArtistsSelectOptions } from "./Shared/SharedFormsUtils.js";
const createAlbumFormHeaderText = "Dodaj album";
const editAlbumFormHeaderText = "Edycja albumu";
export function createAlbum() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Create album in progress");
        const albumFormFields = createAlbumFormFields();
        const albumCreateForm = new itemSharedForm(albumFormFields, null, null);
        yield albumCreateForm.renderAlbumForm(createAlbumFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //onSave
            console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, albumFormFields);
            if (!artistId || artistId === 0) {
                toast.error("Wybierz artystę");
                return;
            }
            const response = yield createAlbumInApi(artistId, albumFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Album został dodany");
                yield displayAlbumsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania albumu");
                console.log(statusCode, response);
            }
        }), () => {
            //onCancel
            console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        });
        yield updateArtistsSelectOptions(artistIdFormFieldId);
    });
}
export function editAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function* () {
        const albumFormFields = editAlbumFormFields();
        yield updateFormFieldsValueFromCurrentAlbumId(albumId, albumFormFields);
        const albumEditForm = new itemSharedForm(albumFormFields, null, null);
        albumEditForm.renderAlbumForm(editAlbumFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //onSave
            //console.log("On save");
            const artistId = getNumberIdByFieldId("artistId", albumFormFields);
            if (!artistId || artistId === 0) {
                toast.error("Wybierz artystę");
                return;
            }
            const response = yield editAlbumInApi(albumId, artistId, albumFormFields);
            const statusCode = response.status;
            if (statusCode === 200) {
                toast.success("Album został zaktualizowany");
                yield displayAlbumsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania albumu");
                console.log(statusCode, response);
            }
        }), () => {
            //onCancel
            //console.log("onCancel");
            toast.info("Anulowano edycje albumu");
        });
        yield updateArtistsSelectOptions(artistIdFormFieldId);
    });
}
export function deleteAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (confirm("Czy na pewno chcesz usunąć album?")) {
            //console.log("Delete album in progress");
            const token = CurrentUser.token;
            const albumUrl = mainURL + "album/" + albumId.toString();
            const abumSongsUrl = mainURL + "album/" + albumId + "/songs";
            const songs = yield getItemsForUrl(abumSongsUrl, token);
            if (songs !== null && songs.length > 0) {
                alert("Album zawiera utwory, usuń je z albumu przed jego usunięciem");
                toast.error("Album zawiera utwory, nie można usunąć albumu");
                return;
            }
            //console.log("Usuwanie albumu");
            const artistId = yield getItemFieldValue("artistId", albumUrl, token);
            const artistSongUrl = mainURL + "artist/" + artistId + "/album/" + albumId.toString();
            const response = yield ApiDeleteMethodWithAuthorization(artistSongUrl, token);
            const statusCode = response.status;
            if (statusCode === 204) {
                toast.success("Album został usunięty");
                yield displayAlbumsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas usuwania albumu");
                console.log(statusCode, response);
            }
        }
    });
}
function updateFormFieldsValueFromCurrentAlbumId(albumId, albumFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = mainURL + "album/" + albumId;
        const token = CurrentUser.token;
        const response = yield ApiGetMethodObjectDtoWithAuthorization(url, token);
        if (response.status === 200) {
            const albumDto = response.data;
            formField.getFormFieldsFromDto(albumDto, albumFormFields);
        }
    });
}
function createAlbumInApi(artistId, albumFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const albumDto = formField.getDtoFromFormFields(albumFormFields);
        const url = mainURL + "artist/" + artistId.toString() + "/album";
        const token = CurrentUser.token;
        const response = yield ApiPostMethodObjectDtoWithAuthorization(url, albumDto, token);
        console.log(albumDto);
        return response;
    });
}
function editAlbumInApi(albumId, artistId, albumFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const albumDto = formField.getDtoFromFormFields(albumFormFields);
        const url = mainURL + "artist/" + artistId.toString() + "/album/" + albumId.toString();
        const token = CurrentUser.token;
        const response = yield ApiPutMethodObjectDtoWithAuthorization(url, albumDto, token);
        console.log(albumDto);
        return response;
    });
}
//# sourceMappingURL=albumCreatorForms.js.map