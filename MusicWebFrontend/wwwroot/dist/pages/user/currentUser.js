var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDto, ApiPostMethodObjectDtoWithAuthorization } from "../../Infrastructure/ApiCommunication/apiHTTPMethods.js";
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
            const responseData = yield newCurrentUser.getTokenFromApi(loginUrl, loginDto);
            if (typeof responseData === "string") {
                this._token = responseData;
                this.setTokenInStorage(true);
                yield newCurrentUser.setCurrentUserByToken();
                console.log(`Użytkownik ${newCurrentUser.name} został zalogowany.`);
                this._currentUser = newCurrentUser;
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
    // public static async changePasswordCurrentUser_test(changePasswordDto: ChangePasswordDto) {
    //     return Math.random() < 0.01 ? 200 : Math.random() > 0.5 ? 400 : 401;
    // }
    static registerUserCurrentUser(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseData = yield ApiPostMethodObjectDto(registerUrl, registerUserDto);
                const responseCode = responseData.status;
                if (responseCode === 201) {
                    console.log(`Użytkownik ${registerUserDto.name} został zarejestrowany.`);
                }
                return responseCode;
            }
            catch (error) {
                console.log("Bład podczas pobierania danych z API", error);
                return 500;
            }
        });
    }
    static changePasswordCurrentUser(changePasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = this._currentUser;
            const token = CurrentUser.getTokenFromStorage();
            if (currentUser === null || token === null) {
                return 401;
            }
            else {
                try {
                    const reposnseData = yield ApiPostMethodObjectDtoWithAuthorization(passwordChangeUrl, changePasswordDto, token);
                    const responseCode = reposnseData.status;
                    if (responseCode === 200) {
                        console.log(`Hasło użytkownika ${currentUser.name} zostało zmienione.`);
                        //user logout if password change was successfully
                        CurrentUser.logoutCurrentUser();
                    }
                    return responseCode;
                }
                catch (error) {
                    console.log("Bład podczas pobierania danych z API", error);
                    return 500;
                }
            }
        });
    }
    setCurrentUserByToken() {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("Ustawianie danych użytkownika w CurrentUser.");
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
        updateOrClear ? sessionStorage.setItem("token", CurrentUser._token) : sessionStorage.removeItem("token");
    }
    static getTokenFromStorage() {
        return sessionStorage.getItem("token");
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
    static isCurrentUserAdmin() {
        var _a;
        return ((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.roleId) === 3;
    }
    static isCurrentUserCreator() {
        var _a;
        return ((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.roleId) === 2;
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