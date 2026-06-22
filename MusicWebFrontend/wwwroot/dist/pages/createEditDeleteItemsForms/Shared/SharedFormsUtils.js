var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mainURL } from "../../../app.js";
import { ApiGetMethodObjectDtoWithAuthorization } from "../../../Utils/apiCommunication.js";
import { CurrentUser } from "../../user/currentUser.js";
import { appendSelectOptionsFromSelectDto } from "./SelectInput.js";
export function getFormFieldsFromDto(dto, formFields) {
    formFields.forEach(field => {
        const value = dto[field.fieldId];
        field.fieldValue = value ? value.toString() : null;
    });
}
export function getFieldValueByFieldId(fieldId, formFields) {
    const field = formFields.find(field => field.fieldId === fieldId);
    return field ? field.fieldValue : null;
}
export function getNumberIdByFieldId(fieldId, formFields) {
    const field = formFields.find(field => field.fieldId === fieldId);
    return field ? Number(field.fieldValue) : null;
}
export function updateArtistsSelectOptions(artistIdFormFieldId) {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.querySelector("form");
        const div = form.querySelector(`#${artistIdFormFieldId}`);
        const artistSelectElement = div.querySelector("select");
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
//# sourceMappingURL=SharedFormsUtils.js.map