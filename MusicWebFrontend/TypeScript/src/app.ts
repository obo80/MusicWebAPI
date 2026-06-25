import { renderMainPage } from "./pages/homePage.js";
import { CurrentUser } from "./pages/user/currentUser.js";
import { itemSharedForm } from "./pages/createEditDeleteItemsForms/Shared/ItemSharedForm.js";
import { formField } from "./pages/createEditDeleteItemsForms/Shared/formField.js";


export const mainURL: string = 'https://localhost:7192/api/';
//console.log(mainURL);

window.onload = () => {

    renderMainPage();
};

