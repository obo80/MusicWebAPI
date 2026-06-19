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
import { displayArtistsPage } from "../displayItemsSubpages/artistSubpage.js";
import { CurrentUser } from "../user/currentUser.js";
import { createArtistformFields } from "./formFieldsCreator.js";
import { formField, itemSharedForm } from "./ItemSharedForm.js";
const createArtistFormHeaderText = "Dodaj artystę";
const esitArtistFormHeaderText = "Dodaj artystę";
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
//# sourceMappingURL=artistCreatorForms.js.map