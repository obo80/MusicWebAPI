var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDto } from "../../functions/apiCommunication.js";
//const currentmainURL = mainURL;
const mainURL = 'https://localhost:7192/api/';
const accountUrl = mainURL + "account";
const loginUrl = accountUrl + "/login";
const registerUrl = accountUrl + "/register";
const passwordChangeUrl = accountUrl + "/change-password";
const currentUserUrl = accountUrl + "/me";
export class CurrentUser {
    constructor() { }
    static get currentUser() {
        return this._currentUser;
    }
    static get token() {
        return this._token;
    }
    static loginCurrentUser(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCurrentUser = new CurrentUser();
            this._currentUser = newCurrentUser;
            const responseData = yield newCurrentUser.getTokenFromApi(loginUrl, loginDto);
            if (typeof responseData === "string") {
                this._token = responseData;
                this.setTokenInStorage(true);
                yield newCurrentUser.setCurrentUserByToken();
                console.log(`Użytkownik ${newCurrentUser.name} został zalogowany.`);
                return 200;
            }
            else {
                CurrentUser._token = null;
                return responseData;
            }
        });
    }
    static logoutCurrentUser() {
        var _a;
        const currentUserName = (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.name;
        this._currentUser = null;
        this._token = null;
        this.setTokenInStorage(false);
        console.log(`Użytkownik ${currentUserName} został wylogowany.`);
    }
    setCurrentUserByToken() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Ustawianie danych użytkownika w CurrentUser.");
            try {
                const userData = yield this.getCurrentUserDataFromApi(CurrentUser._token);
                if (userData !== null) {
                    this.id = userData.id;
                    this.name = userData.name;
                    this.firstName = userData.firstName;
                    this.lastName = userData.lastName;
                    this.email = userData.email;
                    this.roleId = userData.roleId;
                    this.roleName = userData.roleName;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static setTokenInStorage(updateOrClear) {
        updateOrClear ? localStorage.setItem("token", CurrentUser._token) : localStorage.removeItem("token");
    }
    getTokenFromApi(url, loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const reposnseData = yield ApiPostMethodObjectDto(url, loginDto);
            const responseCode = reposnseData.status;
            if (responseCode === 200) {
                return reposnseData.data;
            }
            else {
                return responseCode;
            }
        });
    }
    getCurrentUserDataFromApi(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const reposnseData = yield ApiGetMethodObjectDtoWithAuthorization(currentUserUrl, token);
            const responseCode = reposnseData.status;
            if (responseCode === 200) {
                return reposnseData.data;
            }
            else {
                return null;
            }
        });
    }
    static getUserLoggingStatus() {
        return this._currentUser !== null;
    }
    static getCurrentUser() {
        const currentUser = this._currentUser;
        //console.log(`Użytkownik ${currentUser?.name} został wyświetlony w konsoli.`);
        return currentUser !== null && currentUser !== void 0 ? currentUser : null;
    }
}
CurrentUser._currentUser = null;
CurrentUser._token = null;
//# sourceMappingURL=currentUser.js.map