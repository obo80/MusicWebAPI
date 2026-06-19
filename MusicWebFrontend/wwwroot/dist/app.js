import { renderMainPage } from "./pages/homePage.js";
import { itemSharedForm } from "./pages/createEditDeleteItemsForms/ItemSharedForm.js";
import { formField } from "./pages/createEditDeleteItemsForms/formField.js";
export const mainURL = 'https://localhost:7192/api/';
//console.log(mainURL);
window.onload = () => {
    renderMainPage();
    // testFormFunction();
};
//setTimeout(() => console.log(CurrentUser.getCurrentUser()), 8000)
const testFormFunction = function () {
    console.log("testFormFunction");
    const pageWrapper = document.querySelector(".page-wrapper");
    // const userNameField: formField = new formField("userName", true, "Imie", "text", "userName", "Adam", true);
    // const userSurnameField: formField = new formField("userSurname", true, "Nazwisko", "text", "userSurname", "Kowalski", true);
    const testFormItems = [
        new formField("userName", true, "Imie", "text", "userName", "Adam", true),
        new formField("userSurname", true, "Nazwisko", "text", "userSurname", "Kowalski", true),
        new formField("userAge", true, "Wiek", "number", "userAge", "20", true),
        new formField("email", false, "Email", "email", "email", "testowy@mail.pl", true),
    ];
    const testForm = new itemSharedForm(testFormItems, "test-form", "testForm");
    const form = testForm.renderArtistForm("Renderuj Artyste", () => {
        console.log("testFormFunction on Save");
        testFormItems.forEach(item => {
            console.log(item.fieldId, " : ", item.fieldValue);
        });
    }, () => {
        console.log("testFormFunction on Cancel");
    });
    //pageWrapper.appendChild(form);
};
//# sourceMappingURL=app.js.map