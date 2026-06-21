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
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDtoWithAuthorization } from "../../Utils/apiCommunication.js";
import { toast } from "../../Utils/toast.js";
import { displayAlbumsPage } from "../displayItemsSubpages/albumSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { formField } from "./Shared/formField.js";
import { createAlbumformFields } from "./Shared/formFieldsCreator.js";
import { itemSharedForm } from "./Shared/ItemSharedForm.js";
import { appendSelectOptionsFromSelectDto } from "./Shared/SelectInput.js";
const createAlbumFormHeaderText = "Dodaj album";
const editAlbumFormHeaderText = "Edycja albumu";
export function createAlbum() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Create album in progress");
        const albumFormFields = createAlbumformFields();
        const createAlbumForm = new itemSharedForm(albumFormFields, null, null);
        const artistId = 2;
        createAlbumForm.renderAlbumForm(createAlbumFormHeaderText, () => __awaiter(this, void 0, void 0, function* () {
            //onSave
            console.log("On save");
            const response = yield createAlbumInApi(artistId, albumFormFields);
            const statusCode = response.status;
            if (statusCode === 201) {
                toast.success("Album został dodany");
                yield displayAlbumsPage();
            }
            else {
                toast.error("Wystąpił błąd podczas dodawania albumu");
                console.log(statusCode, response.body);
            }
        }), () => {
            //onCancel
            console.log("Cancel");
            toast.info("Anulowano dodawanie albumu");
        });
        const artistSelectId = "artistId";
        yield updateArtistsSelectOptions(artistSelectId);
    });
}
export function editAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Edit album in progress");
    });
}
export function deleteAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (confirm("Czy na pewno chcesz usunąć album?")) {
            console.log("Delete album in progress");
        }
    });
}
function updateArtistsSelectOptions(selectQuerySelector) {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.querySelector("form");
        const artistSelectElement = form.querySelector("select#artistId");
        //const selectElement = document.querySelector(selectQuerySelector) ;
        //get artists from Api and set options in form
        const artists = yield getAllArtistsFronApi();
        const SelectOptions = [];
        artists === null || artists === void 0 ? void 0 : artists.forEach(artist => {
            const SelectOption = { value: artist.id, text: artist.name };
            SelectOptions.push(SelectOption);
        });
        if (SelectOptions.length === 0)
            return;
        if (artistSelectElement === null)
            return;
        appendSelectOptionsFromSelectDto(SelectOptions, artistSelectElement);
    });
}
function getAllArtistsFronApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = mainURL + "artist";
        const response = yield ApiGetMethodObjectDtoWithAuthorization(url, CurrentUser.token);
        if (response.status !== 200)
            return null;
        const artists = response.data.items;
        return artists;
    });
}
function createAlbumInApi(artistId, artistFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const artistDto = formField.getDtoFromFormFields(artistFormFields);
        const url = mainURL + "artist" + artistId.toString() + "/album";
        const token = CurrentUser.token;
        const response = yield ApiPostMethodObjectDtoWithAuthorization(url, artistDto, token);
        console.log(artistDto);
        return response;
    });
}
//# sourceMappingURL=albumCreatorForms.js.map