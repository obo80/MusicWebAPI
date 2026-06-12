import { renderMainPage } from "./pages/homePage.js";
export const mainURL = 'https://localhost:7192/api/';
//console.log(mainURL);
window.onload = () => {
    renderMainPage();
};
//setTimeout(() => console.log(CurrentUser.getCurrentUser()), 8000)
//# sourceMappingURL=app.js.map