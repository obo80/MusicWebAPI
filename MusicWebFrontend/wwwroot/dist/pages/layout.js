import { createDivByClassName } from "../Utils/helpers.js";
import { musicIconString } from "../Utils/sharedSVgIcons.js";
import { createSvgFromString } from "./createSvgFromString.js";
import { renderMainPage } from "./homePage.js";
import { displayAlbumsPage } from "./displayItemsSubpages/albumSubpage.js";
import { displayArtistsPage } from "./displayItemsSubpages/artistSubpage.js";
import { displaySongsPage } from "./displayItemsSubpages/songSupbpage.js";
import { getUserButtonContainer } from "./user/userButton.js";
const welcomeTextString = "Witaj w MusicWeb!";
export function createLayout(header, subheader) {
    //const bodyElement = document.querySelector("body");
    const pageWrapper = createDivByClassName("page-wrapper");
    const headerElement = createHeader();
    const maintContentElement = createMainContent();
    pageWrapper.appendChild(headerElement);
    pageWrapper.appendChild(createMainContentElement(header, subheader));
    return pageWrapper;
}
function createHeader() {
    const headerElement = document.createElement("header");
    headerElement.classList.add("page-header");
    const headerTop = createDivByClassName("header-top");
    const headerTopLeft = createDivByClassName("header-top-left");
    const headerTopRight = createDivByClassName("header-top-right");
    const userButtonContainer = getUserButtonContainer();
    headerTopRight.appendChild(userButtonContainer);
    const headerTopCenter = createHeaderTopCenter();
    const mainMenu = createMainMenu();
    headerTop.appendChild(headerTopLeft);
    headerTop.appendChild(headerTopCenter);
    headerTop.appendChild(headerTopRight);
    headerElement.appendChild(headerTop);
    headerElement.appendChild(mainMenu);
    return headerElement;
}
function createHeaderTopCenter() {
    const headerTopCenter = createDivByClassName("header-top-center");
    headerTopCenter.addEventListener("click", () => renderMainPage());
    const logoIcon = createSvgFromString(musicIconString);
    if (logoIcon) {
        logoIcon.classList.add("logo-icon");
        headerTopCenter.appendChild(logoIcon);
    }
    const welcomeText = document.createElement("span");
    welcomeText.classList.add("welcome-text");
    welcomeText.textContent = welcomeTextString;
    headerTopCenter.appendChild(welcomeText);
    return headerTopCenter;
}
function createMainMenu() {
    const navbar = document.createElement("nav");
    navbar.classList.add("navbar");
    const mainMenu = document.createElement("ul");
    mainMenu.classList.add("main-menu");
    mainMenu.appendChild(createMainMenuListElement("menu-item-artist", "menu-item", "Artyści", displayArtistsPage));
    mainMenu.appendChild(createMainMenuListElement("menu-item-albums", "menu-item", "Albumy", displayAlbumsPage));
    mainMenu.appendChild(createMainMenuListElement("menu-item-songs", "menu-item", "Utwory", displaySongsPage));
    navbar.appendChild(mainMenu);
    return navbar;
}
function createMainMenuListElement(id, className, text, callback) {
    const listElement = document.createElement("li");
    listElement.classList.add(className);
    listElement.id = id;
    listElement.textContent = text;
    listElement.addEventListener("click", callback);
    return listElement;
}
export function createMainContentElement(header, subheader) {
    const mainContent = document.createElement("main");
    mainContent.classList.add("main-content");
    const mainHeaderElement = document.createElement("div");
    mainHeaderElement.classList.add("main-header");
    const headerElement = document.createElement("h1");
    headerElement.textContent = header;
    const subheaderElement = document.createElement("h2");
    subheaderElement.innerHTML = subheader;
    mainHeaderElement.appendChild(headerElement);
    mainHeaderElement.appendChild(subheaderElement);
    mainContent.appendChild(mainHeaderElement);
    return mainContent;
}
function createMainContent() {
    const maintContentElement = document.createElement("main");
    maintContentElement.classList.add("main-content");
    return maintContentElement;
}
//# sourceMappingURL=layout.js.map