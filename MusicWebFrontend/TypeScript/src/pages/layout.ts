import { createDivByClassName } from "../functions/helpers.js";
import { createSvgFromString } from "./createSvgFromString.js";
import { renderMainPage } from "./homePage.js";
import { displayAlbumsPage } from "./subpages/albumSubpage.js";
import { displayArtistsPage } from "./subpages/artistSubpage.js";
import { displaySongsPage } from "./subpages/songSupbpage.js";
import { getUserButtonContainer } from "./user/userButton.js";

const welcomeTextString: string = "Witaj w MusicWeb!";
const musicIconString =`<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30" class="logo-icon"><path fill="currentColor" d="M23.311,12.464c.438,.38,.689,.93,.689,1.51v6.525c0,1.381-1.119,2.5-2.5,2.5s-2.5-1.119-2.5-2.5,1.119-2.5,2.5-2.5c.171,0,.338,.018,.5,.05v-4.076l-5,.715v6.811c0,1.381-1.119,2.5-2.5,2.5s-2.5-1.119-2.5-2.5,1.119-2.5,2.5-2.5c.171,0,.338,.018,.5,.05v-4.361c0-.989,.738-1.84,1.717-1.98l5-.714c.576-.083,1.156,.089,1.594,.469Zm-2.311-10.464H12.236L8.236,0H3C1.346,0,0,1.346,0,3v3H24v-1c0-1.654-1.346-3-3-3ZM0,22H10.051c-.019-.166-.051-.329-.051-.5,0-1.953,1.258-3.602,3-4.224v-2.587c0-1.978,1.477-3.681,3.435-3.96l4.999-.714c.897-.126,1.796,.061,2.566,.507v-2.522H0v14Z"/></svg>`;


export function createLayout(header: string, subheader: string): HTMLDivElement {
    //const bodyElement = document.querySelector("body");
    const pageWrapper = createDivByClassName("page-wrapper");
    const headerElement = createHeader();
    const maintContentElement = createMainContent();

    pageWrapper.appendChild(headerElement);
    pageWrapper.appendChild(createMainContentElement(header, subheader));

    return pageWrapper;
}


function createHeader(): HTMLElement {
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
function createHeaderTopCenter(): HTMLDivElement {
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

function createMainMenu(): HTMLElement {
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
function createMainMenuListElement(id: string, className: string, text: string, callback: () => void): HTMLElement {
    const listElement = document.createElement("li");
    listElement.classList.add(className);
    listElement.id = id;
    listElement.textContent = text;
    listElement.addEventListener("click", callback);
    return listElement;
}

export function createMainContentElement(header: string, subheader: string): HTMLElement {
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

function createMainContent(): HTMLElement {
    const maintContentElement = document.createElement("main");
    maintContentElement.classList.add("main-content");

    return maintContentElement;
}
