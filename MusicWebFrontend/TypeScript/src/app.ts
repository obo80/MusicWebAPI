import { renderMainPage } from "./pages/homePage.js";


export const mainURL: string = 'https://localhost:7192/api/';
//console.log(mainURL);

window.onload = () => {

    renderMainPage();
};

