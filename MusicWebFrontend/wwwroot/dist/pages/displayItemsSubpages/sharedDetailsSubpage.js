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
import { CurrentUser } from "../user/currentUser.js";
import { renderAlbumDetailsPage } from "./albumIdDetailsSubpage.js";
import { renderArtistDetailsPage } from "./artistIdDetailsSubpage.js";
import { renderSongDetailsPage } from "./songIdDetailsSubpage.js";
export function renderDetailsSubpage(id, itemType) {
    console.log("renderDetailsSubpage");
    createItemDetaisTemplateInMainContent(id, itemType);
    switch (itemType) {
        case "artist":
            renderArtistDetailsPage(id);
            break;
        case "album":
            renderAlbumDetailsPage(id);
            break;
        case "song":
            renderSongDetailsPage(id);
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
                break;
            case "album":
                yield editAlbum(id);
                break;
            case "song":
                yield editSong(id);
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
                break;
            case "album":
                yield createAlbum();
                break;
            case "song":
                yield createSong();
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
                break;
            case "album":
                yield deleteAlbum(id);
                break;
            case "song":
                yield deleteSong(id);
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
function createItemDetaisTemplateInMainContent(id, itemType) {
    const mainContent = document.querySelector("main");
    if (!mainContent) {
        console.log("main element was't found");
        return;
    }
    mainContent.innerHTML = "";
    console.log("Tworzenie nowego main content");
    const divForTopButtons = createTopButtonsContainer(id, itemType);
    mainContent.appendChild(divForTopButtons);
    const mainDetailsContainer = createDivByClassName("main-details-container");
    mainContent.appendChild(mainDetailsContainer);
}
function createTopButtonsContainer(id, itemType) {
    const topButtonsContainer = createDivByClassName("details-top-buttons-container");
    const editItemButton = document.createElement("button");
    const deleteItemButton = document.createElement("button");
    topButtonsContainer.appendChild(editItemButton);
    topButtonsContainer.appendChild(deleteItemButton);
    editItemButton.classList.add("btn-edit-item-details", "btn-detail");
    deleteItemButton.classList.add("btn-delete-item-details", "btn-detail");
    let editButtonText = "";
    let deleteButtonText = "";
    switch (itemType) {
        case "artist":
            editButtonText = "✏️ Edytuj artystę";
            deleteButtonText = "❌ Usuń artystę";
            break;
        case "album":
            editButtonText = "✏️ Edytuj album";
            deleteButtonText = "❌ Usuń album";
            break;
        case "song":
            editButtonText = "✏️ Edytuj utwor";
            deleteButtonText = "❌ Usuń utwor";
            break;
        case null:
            //console.log("Nic nie robić dla null");
            editButtonText = "🎵 Nowy...";
            break;
        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
    editItemButton.textContent = editButtonText;
    editItemButton.addEventListener("click", () => renderEditItemSubpage(id, itemType));
    deleteItemButton.textContent = deleteButtonText;
    deleteItemButton.addEventListener("click", () => renderDeleteItemSubpage(id, itemType));
    if (CurrentUser.isCurrentUserCreator()) {
        editItemButton.style.display = "block";
        deleteItemButton.style.display = "block";
    }
    else {
        editItemButton.style.display = "none";
        deleteItemButton.style.display = "none";
    }
    return topButtonsContainer;
}
//# sourceMappingURL=sharedDetailsSubpage.js.map