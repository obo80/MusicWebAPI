//import { mainURL } from "../../app.js";
import { LoginDto, UserDto } from "../../DTO/UserDtos.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDto } from "../../functions/apiCommunication.js";

//const currentmainURL = mainURL;

const mainURL: string = 'https://localhost:7192/api/';
const accountUrl = mainURL + "account";
const loginUrl = accountUrl + "/login";
const registerUrl = accountUrl + "/register";
const passwordChangeUrl = accountUrl + "/change-password";
const currentUserUrl = accountUrl + "/me";


export class CurrentUser {


    id: number;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    roleId: number;
    roleName?: string;

    private static _currentUser: CurrentUser  | null = null;
    private static _token: string | null = null;

    private constructor() { }

    static get currentUser(): CurrentUser | null {
        return this._currentUser;
    }

    static get token(): string | null {
        return this._token;
    }

    public static async loginCurrentUser(loginDto: LoginDto) {
        const newCurrentUser = new CurrentUser();
        this._currentUser = newCurrentUser;

        const responseData = await newCurrentUser.getTokenFromApi(loginUrl, loginDto);
        if (typeof responseData === "string") {
            this._token = responseData;
            this.setTokenInStorage(true);
            await newCurrentUser.setCurrentUserByToken();
            console.log(`Użytkownik ${newCurrentUser.name} został zalogowany.`);
            return 200;
        }
        else {
            CurrentUser._token = null;

            return responseData;
        }

    }

    public static logoutCurrentUser() {
        const currentUserName = this._currentUser?.name;
        this._currentUser = null;
        this._token = null;
        this.setTokenInStorage(false);
        console.log(`Użytkownik ${currentUserName} został wylogowany.`);
    }

    private async setCurrentUserByToken()  {
        console.log("Ustawianie danych użytkownika w CurrentUser.");
        try {
            const userData = await this.getCurrentUserDataFromApi(CurrentUser._token!);
            if (userData !== null) {
                this.id = userData.id;
                this.name = userData.name;
                this.firstName = userData.firstName;
                this.lastName = userData.lastName;
                this.email = userData.email;
                this.roleId = userData.roleId;
                this.roleName = userData.roleName;

            }                

        } catch (error) {
            console.log(error);
        }
    }

    private static setTokenInStorage(updateOrClear: boolean): void {
        updateOrClear ? localStorage.setItem("token", CurrentUser._token) : localStorage.removeItem("token");
    }

    private async getTokenFromApi(url: string, loginDto: LoginDto) {
        const reposnseData = await ApiPostMethodObjectDto<LoginDto, string>(url, loginDto);
        const responseCode = reposnseData.status;
        if (responseCode === 200) {
            return reposnseData.data;
        }
        else {
            return responseCode;
        }
    }

    private async getCurrentUserDataFromApi(token: string) {
        const reposnseData = await ApiGetMethodObjectDtoWithAuthorization<UserDto>(currentUserUrl, token);
        const responseCode = reposnseData.status;
        if (responseCode === 200) {
            return reposnseData.data;
        }
        else {
            return null;
        }
    }


    public static getUserLoggingStatus(): boolean {
        return this._currentUser !== null;
    }

    public static getCurrentUser(): CurrentUser | null {
        const currentUser = this._currentUser;
        //console.log(`Użytkownik ${currentUser?.name} został wyświetlony w konsoli.`);
        return currentUser??null;
    }






}