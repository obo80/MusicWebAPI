import { createDivByClassName } from "../../Utils/helpers.js";
import { createAlbum, deleteAlbum, editAlbum } from "../createEditDeleteItemsForms/albumCreatorForms.js";
import { createArtist, deleteArtist, editArtist } from "../createEditDeleteItemsForms/artistCreatorForms.js";
import { createSong, deleteSong, editSong } from "../createEditDeleteItemsForms/songCreatorForms.js";
import { CurrentUser } from "../user/currentUser.js";
import { renderAlbumDetailsPage } from "./albumIdDetailsSubpage.js";
import { renderArtistDetailsPage } from "./artistIdDetailsSubpage.js";
import { renderSongDetailsPage } from "./songIdDetailsSubpage.js";

 

export type ItemType = "artist" | "album" | "song" | null;
export function renderDetailsSubpage(id: number, itemType: ItemType) {
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


export async function renderEditItemSubpage(id: number, itemType: ItemType) {
    switch (itemType) {
        case "artist":
            await editArtist(id);
            break;

        case "album":
            await editAlbum(id);
            break;

        case "song":
            await editSong(id);
            break;

        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
}

export async function renderCreateItemSubpage(itemType: ItemType) {
    switch (itemType) {
        case "artist":
            await createArtist();
            break;

        case "album":
            await createAlbum();
            break;

        case "song":
            await createSong();
            break;

        default:
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }
}
export async function renderDeleteItemSubpage(id: number, itemType: ItemType) {
    switch (itemType) {
        case "artist":
            await deleteArtist(id);
            break;

        case "album":
            await deleteAlbum(id);
            break;

        case "song":
            await deleteSong(id);
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


function createItemDetaisTemplateInMainContent(id: number, itemType: ItemType): void {
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

function createTopButtonsContainer(id: number, itemType: ItemType): HTMLElement {
    const topButtonsContainer = createDivByClassName("details-top-buttons-container");
    const editItemButton = document.createElement("button");
    const deleteItemButton = document.createElement("button");

    topButtonsContainer.appendChild(editItemButton);
    topButtonsContainer.appendChild(deleteItemButton);
    editItemButton.classList.add("btn-edit-item-details", "btn-detail");
    deleteItemButton.classList.add("btn-delete-item-details", "btn-detail");


    let editButtonText: string = "";
    let deleteButtonText: string = "";
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
    deleteItemButton.addEventListener("click", () => renderDeleteItemSubpage(id,itemType));

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
    