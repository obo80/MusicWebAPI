//import { mainURL } from "../../app.js";
import { ChangePasswordDto, LoginDto, RegisterUserDto, UserDto } from "../../DTO/UserDtos.js";
import { ApiGetMethodObjectDtoWithAuthorization, ApiPostMethodObjectDto, ApiPostMethodObjectDtoWithAuthorization, IApiResponse } from "../../Utils/apiCommunication.js";

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
    private static tempCode: 400;

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
        const responseData = await newCurrentUser.getTokenFromApi(loginUrl, loginDto);
        if (typeof responseData === "string") {
            this._token = responseData;
            this.setTokenInStorage(true);
            await newCurrentUser.setCurrentUserByToken();
            console.log(`Użytkownik ${newCurrentUser.name} został zalogowany.`);
            this._currentUser = newCurrentUser;
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

    // public static async changePasswordCurrentUser_test(changePasswordDto: ChangePasswordDto) {
    //     return Math.random() < 0.01 ? 200 : Math.random() > 0.5 ? 400 : 401;
    // }

    public static async registerUserCurrentUser(registerUserDto: RegisterUserDto): Promise<number>{
        try {
            const responseData = await ApiPostMethodObjectDto<RegisterUserDto, UserDto>(registerUrl, registerUserDto);
            const responseCode = responseData.status;
            if (responseCode === 201) {
                console.log(`Użytkownik ${registerUserDto.name} został zarejestrowany.`);
            }
            return responseCode;
        } catch (error) {
            console.log("Bład podczas pobierania danych z API", error);
            return 500;
        }

    }


    public static async changePasswordCurrentUser(changePasswordDto: ChangePasswordDto) {
        const currentUser = this._currentUser;
        const token = CurrentUser.getTokenFromStorage();
        if (currentUser === null || token === null) {
            return 401;
        }
        else {
            try {
                const reposnseData = await ApiPostMethodObjectDtoWithAuthorization<ChangePasswordDto, UserDto>(passwordChangeUrl, changePasswordDto, token);
                const responseCode = reposnseData.status;
                if (responseCode === 200) {
                    console.log(`Hasło użytkownika ${currentUser.name} zostało zmienione.`);

                    //user logout if password change was successfully
                    CurrentUser.logoutCurrentUser();
                }
                
                return responseCode;
            } catch (error) {
                console.log("Bład podczas pobierania danych z API", error);
                return 500;
            }
        }
    }

    private async setCurrentUserByToken()  {
        //console.log("Ustawianie danych użytkownika w CurrentUser.");
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
        updateOrClear ? sessionStorage.setItem("token", CurrentUser._token) : sessionStorage.removeItem("token");
    }
    private static getTokenFromStorage(): string | null {
        return sessionStorage.getItem("token");
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

    public static isCurrentUserAdmin(): boolean {
        return this._currentUser?.roleId === 3;
    }

    public static isCurrentUserCreator(): boolean {
        return this._currentUser?.roleId === 2;
    }

    public static getCurrentUser(): CurrentUser | null {
        const currentUser = this._currentUser;
        //console.log(`Użytkownik ${currentUser?.name} został wyświetlony w konsoli.`);
        return currentUser??null;
    }






}