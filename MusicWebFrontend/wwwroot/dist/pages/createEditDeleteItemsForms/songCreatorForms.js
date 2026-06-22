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
import { ApiPostMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displaySongsPage } from "../displayItemsSubpages/songSupbpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { createSongFormFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { getNumberIdByFieldId, updateAlbumsSelectOptions, updateArtistsSelectOptions } from "./Shared/SharedFormsUtils.js";
const createSongFormHeaderText = "Dodaj utwór";
const editSongFormHeaderText = "Edycja utworu";
const artistIdFormFieldId = "artistId";
const albumIdFormFieldId = "albumId";
export function createSong() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Create song in progress");
        const songFormFields = createSongFormFields();
        const songCreateForm = new itemSharedForm(songFormFields, null, null);
        yield songCreateForm.renderSongForm(createSongFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //blokowanie i aktualizacja selecta albumu po wyborze artysty
            //dodać wywołanie jakiejś funkcji która sprawdza czy jest wybrany artysta i aktualizuje selecta albumu
            //i musi też w tym moim generyku zgadywać który select jest nasłuchiwany
            //dodać jeszcze jakąś blokadę tego selecta, żeby nie mogło być wybrany jesli nie jest wybrany artysta
            //on Save
            console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
            //const albumId = getNumberIdByFieldId(albumIdFormFieldId, songFormFields);
            const response = yield createSongInApi(artistId, songFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Utwór został dodany");
                yield displaySongsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania utworu");
                console.log(statusCode, response);
            }
        }), () => __awaiter(this, void 0, void 0, function* () {
            //on Cancel
            console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        }));
        yield updateArtistsSelectOptions(artistIdFormFieldId);
    });
}
export function editSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Edit song in progress");
    });
}
export function deleteSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (confirm("Czy na pewno chcesz usunąć utwór?")) {
            console.log("Delete song in progress");
        }
    });
}
function createSongInApi(artistId, songFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const songDto = formField.getDtoFromFormFields(songFormFields);
        const url = mainURL + "artist/" + artistId.toString() + "/song";
        const token = CurrentUser.token;
        const response = yield ApiPostMethodObjectDtoWithAuthorization(url, songDto, token);
        console.log(songDto);
        return response;
    });
}
export function updateAlbumsSelectOptionsBySelectedArtist(currentFieldId, currentFieldValue) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentFieldId != artistIdFormFieldId)
            return;
        else {
            yield updateAlbumsSelectOptions(albumIdFormFieldId, Number(currentFieldValue));
        }
    });
}
//# sourceMappingURL=songCreatorForms.js.map