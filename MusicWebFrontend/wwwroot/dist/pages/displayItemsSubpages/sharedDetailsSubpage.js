var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createDivByClassName } from "../../Utils/helpers.js";
import { createAlbum, deleteAlbum, editAlbum } from "../createEditDeleteItemsForms/albumCreatorForms.js";
import { createArtist, deleteArtist, editArtist } from "../createEditDeleteItemsForms/artistCreatorForms.js";
import { createSong, deleteSong, editSong } from "../createEditDeleteItemsForms/songCreatorForms.js";
import { renderAlbumDetailsPage } from "./albumIdDetailsSubpage.js";
import { renderArtistDetailsPage } from "./artistIdDetailsSubpage.js";
import { renderSongDetailsPage } from "./songIdDetailsSubpage.js";
export function renderDetailsSubpage(id, itemType) {
    console.log("renderDetailsSubpage");
    createItemDetaisTemplateInMainContent();
    switch (itemType) {
        case "artist":
            renderArtistDetailsPage(id);
            //console.log("Wyświetlanie szczegółów artysty o id:", id);
            break;
        case "album":
            renderAlbumDetailsPage(id);
            //console.log("Wyświetlanie szczegółów albumu o id:", id);
            break;
        case "song":
            renderSongDetailsPage(id);
            //console.log("Wyświetlanie szczegółów utworu o id:", id);
            break;
        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
}
export function renderEditItemSubpage(id, itemType) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (itemType) {
            case "artist":
                yield editArtist(id);
                //console.log("Edycja szczegółów artysty o id:", id);
                break;
            case "album":
                yield editAlbum(id);
                //console.log("Edycja szczegółów albumu o id:", id);
                break;
            case "song":
                yield editSong(id);
                //console.log("Edycja szczegółów utworu o id:", id);
                break;
            default:
                console.error(`Nieobsługiwany typ: ${itemType}`);
        }
    });
}
export function renderCreateItemSubpage(itemType) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (itemType) {
            case "artist":
                yield createArtist();
                //console.log("Tworzenie nowego artysty");
                break;
            case "album":
                yield createAlbum();
                //console.log("Tworzenie nowego albumu");
                break;
            case "song":
                yield createSong();
                //console.log("Tworzenie nowego utworu");
                break;
            default:
                console.error(`Nieobsługiwany typ: ${itemType}`);
        }
    });
}
export function renderDeleteItemSubpage(id, itemType) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (itemType) {
            case "artist":
                yield deleteArtist(id);
                //console.log("Usuwanie artysty o id:", id);
                break;
            case "album":
                yield deleteAlbum(id);
                //console.log("Usuwanie albumu o id:", id);
                break;
            case "song":
                yield deleteSong(id);
                //console.log("Usuwanie utworu o id:", id);
                break;
            default:
                console.error(`Nieobsługiwany typ: ${itemType}`);
        }
    });
}
export function renderRatingSubpage(id, itemType) {
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
function createItemDetaisTemplateInMainContent() {
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
//# sourceMappingURL=sharedDetailsSubpage.js.map