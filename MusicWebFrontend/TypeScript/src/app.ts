import { renderMainPage } from "./pages/homePage.js";
import { CurrentUser } from "./pages/user/currentUser.js";


export const mainURL: string = 'https://localhost:7192/api/';
//console.log(mainURL);

window.onload = () => {

    renderMainPage()
};
//setTimeout(() => console.log(CurrentUser.getCurrentUser()), 8000)

