import { createDivByClassName } from "../../Utils/helpers.js";
import { renderAlbumDetailsPage } from "./albumIdDetailsSubpage.js";
import { renderArtistDetailsPage } from "./artistIdDetailsSubpage.js";
import { renderSongDetailsPage } from "./songIdDetailsSubpage.js";

export type ItemType = "artist" | "album" | "song" | null;
export function renderDetailsSubpage(id: number, itemType: ItemType) {
    console.log("renderDetailsSubpage");
    createItemDetaisTemplateInMainContent();

    switch (itemType) {
        case "artist":
            renderArtistDetailsPage(id)
            console.log("Wyświetlanie szczegółów artysty o id:", id);
            break;

        case "album":
            renderAlbumDetailsPage(id);
            console.log("Wyświetlanie szczegółów albumu o id:", id);
            break;

        case "song":
            renderSongDetailsPage(id);
            console.log("Wyświetlanie szczegółów utworu o id:", id);
            break;

        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
}


export function renderEditItemSubpage(id: number, itemType: ItemType) {
    switch (itemType) {
        case "artist":
            
            console.log("Edycja szczegółów artysty o id:", id);
            break;

        case "album":
            
            console.log("Edycja szczegółów albumu o id:", id);
            break;

        case "song":
            
            console.log("Edycja szczegółów utworu o id:", id);
            break;

        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
}

export function renderCreateItemSubpage(itemType: ItemType) {
    switch (itemType) {
        case "artist":

            console.log("Tworzenie nowego artysty");
            break;

        case "album":

            console.log("Tworzenie nowego albumu");
            break;

        case "song":

            console.log("Tworzenie nowego utworu");
            break;

        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
}
export function renderDeleteItemSubpage(id: number, itemType: ItemType) {
    switch (itemType) {
        case "artist":
            console.log("Usuwanie artysty o id:", id);
            break;

        case "album":
            console.log("Usuwanie albumu o id:", id);
            break;

        case "song":
            console.log("Usuwanie utworu o id:", id);
            break;

        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);

    }
}


export function renderRatingSubpage(id: number, itemType: ItemType) {
    
    switch (itemType) {
        case "artist":
            console.log("Ocena artysty o id:", id);
            break;

        case "album":
            console.log("Ocena albumu o id:", id);
            break;

        case "song":
            console.log("Ocena utworu o id:", id);
            break;

        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
}


function createItemDetaisTemplateInMainContent(): void {
    const mainContent = document.querySelector("main");
    if (!mainContent) {
        console.log("main element was't found");
        return;
    }
    mainContent.innerHTML = "";
    console.log("Tworzenie nowego main content");


    const mainDetailsContainer = createDivByClassName("main-details-container");

    mainContent.appendChild(mainDetailsContainer);

}
    