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
import { displaySongsPage } from "../displayItemsSubpages/songSupbpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { albumIdFormFieldId, artistIdFormFieldId, createSongFormFields, editSongFormFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { markCurretnItemInSelect } from "./Shared/SelectInput.js";
import { getNumberIdByFieldId, updateAlbumsSelectOptions, updateArtistsSelectOptions } from "./Shared/SharedFormsUtils.js";
const createSongFormHeaderText = "Dodaj utwór";
const editSongFormHeaderText = "Edycja utworu";
export function createSong() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Create song in progress");
        const songFormFields = createSongFormFields();
        const songCreateForm = new itemSharedForm(songFormFields, null, null);
        yield songCreateForm.renderSongForm(createSongFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //on Save
            //console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
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
            //console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        }));
        yield updateArtistsSelectOptions(artistIdFormFieldId);
    });
}
export function editSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Edit song in progress");
        const songFormFields = editSongFormFields();
        yield updateFormFieldsValueFromCurrentSongId(songId, songFormFields);
        const songEditForm = new itemSharedForm(songFormFields, null, null);
        yield songEditForm.renderSongForm(editSongFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //on Save
            //console.log("On save");
            const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
            const response = yield editSongInApi(songId, artistId, songFormFields);
            const statusCode = response.status;
            if (statusCode === 200) {
                toast.success("Utwór został zaktualizowany");
                yield displaySongsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas edycji utworu");
                console.log(statusCode, response);
            }
        }), () => __awaiter(this, void 0, void 0, function* () {
            //on Cancel
            //console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        }));
        yield updateArtistsSelectOptions(artistIdFormFieldId);
        const artistId = getNumberIdByFieldId(artistIdFormFieldId, songFormFields);
        yield updateAlbumsSelectOptions(albumIdFormFieldId, artistId, false);
        markCurretnItemInSelect(albumIdFormFieldId, songFormFields, false);
    });
}
export function deleteSong(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (confirm("Czy na pewno chcesz usunąć utwór?")) {
            console.log("Delete song in progress");
        }
    });
}
function updateFormFieldsValueFromCurrentSongId(songId, songFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = mainURL + "song/" + songId;
        const token = CurrentUser.token;
        const response = yield ApiGetMethodObjectDtoWithAuthorization(url, token);
        if (response.status === 200) {
            const songDto = response.data;
            formField.getFormFieldsFromDto(songDto, songFormFields);
        }
    });
}
function createSongInApi(artistId, songFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const songDto = formField.getDtoFromFormFields(songFormFields);
        const url = mainURL + "artist/" + artistId.toString() + "/song";
        const token = CurrentUser.token;
        const response = yield ApiPostMethodObjectDtoWithAuthorization(url, songDto, token);
        return response;
    });
}
function editSongInApi(singId, artistId, songFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const songDto = formField.getDtoFromFormFields(songFormFields);
        //replace 0 with null
        songDto.albumId = songDto.albumId === 0 ? null : songDto.albumId;
        const url = mainURL + "artist/" + artistId.toString() + "/song/" + singId.toString();
        const token = CurrentUser.token;
        const response = yield ApiPutMethodObjectDtoWithAuthorization(url, songDto, token);
        console.log(songDto);
        return response;
    });
}
export function updateAlbumsSelectOptionsBySelectedArtist(currentFieldId, currentFieldValue, isRequired) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentFieldId != artistIdFormFieldId)
            return;
        else {
            yield updateAlbumsSelectOptions(albumIdFormFieldId, Number(currentFieldValue), isRequired);
        }
    });
}
//# sourceMappingURL=songCreatorForms.js.map