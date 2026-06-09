import { createDivByClassName } from "../../functions/helpers.js";
import { renderAlbumDetailsPage } from "./albumIdDetailsSubpage.js";
import { renderArtistDetailsPage } from "./artistIdDetailsSubpage.js";
import { renderSongDetailsPage } from "./songIdDetailsSubpage.js";

type ItemType = "artist" | "album" | "song";
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
    