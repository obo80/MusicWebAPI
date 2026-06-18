import type { ItemDTO } from "../../DTO/ItemsDto.js";
import { createDivByClassName } from "../../Utils/helpers.js";
import { CurrentUser } from "../user/currentUser.js";
import { ItemType, renderCreateItemSubpage, renderDeleteItemSubpage, renderDetailsSubpage, renderEditItemSubpage, renderRatingSubpage } from "./sharedDetailsSubpage.js";

export function createMainContentContainerElement(header: string, subheader: string, itemType: ItemType): HTMLElement {
    const mainContent = document.createElement("main");
    mainContent.classList.add("main-content");

    const mainHeaderElement = createDivByClassName("main-header");

    const headerElement = document.createElement("h1");
    headerElement.textContent = header;

    const subheaderElement = document.createElement("h2");
    subheaderElement.innerHTML = subheader;

    mainHeaderElement.appendChild(headerElement);
    mainHeaderElement.appendChild(subheaderElement);

    //Kontener na całą siatkę kafelków
    const tileContainer = createDivByClassName("tiles-query-grid");
    const queryContainer = createDivByClassName("query-container");
    const topButtonsContainer = createTopButtonsContainer(itemType);

    queryContainer.textContent = "Tutaj będzie można filtrować i sortować wyniki.-- PLACEHOLDER";
    // Dodajemy kontener zapytań do głównej zawartości - to do na potem

    const tilesGrid = createDivByClassName("tiles-grid");

    tileContainer.appendChild(queryContainer);
    tileContainer.appendChild(topButtonsContainer);
    tileContainer.appendChild(tilesGrid);

    mainContent.appendChild(mainHeaderElement);
    mainContent.appendChild(tileContainer);

    return mainContent;
}


function createTopButtonsContainer(itemType: ItemType): HTMLElement {
    const topButtonsContainer = createDivByClassName("top-buttons-container");
    const addNewItemButton = document.createElement("button");

    topButtonsContainer.appendChild(addNewItemButton);
    addNewItemButton.classList.add("btn-new-item", "btn-detail");

    let newButtonText: string = "";
    switch(itemType) {
        case "artist": 
            newButtonText = "🎤 Nowy artysta";
            break;
        case "album":
            newButtonText = "💿 Nowy album";
            break;
        case "song":
            newButtonText = "🎵 Nowy utwor";
            break;

        case null:
            console.log("Nic nie robić dla null");
            newButtonText = "🎵 Nowy...";
            break;

        default:
            
            console.error(`Nieobsługiwany typ: ${itemType}`);
    }

    addNewItemButton.textContent = newButtonText;
    addNewItemButton.addEventListener("click", () => renderCreateItemSubpage(itemType));

    if (CurrentUser.isCurrentUserCreator()) {
        addNewItemButton.style.display = "block";
    }
    else {
        addNewItemButton.style.display = "none";
    }
    return topButtonsContainer;
}



export function createDetailsButtonsDiv(item: ItemDTO, itemType: ItemType): HTMLElement {
    
    const detailsButtonsDiv = document.createElement("div");
    detailsButtonsDiv.classList.add("details-buttons");

    const moreDetailsButton = document.createElement("button");
    const ratingButton = document.createElement("button");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    if (CurrentUser.isCurrentUserCreator()) {
        editButton.style.display = "block";
        deleteButton.style.display = "block";
    }
    else {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
    }
    

    moreDetailsButton.classList.add("btn-detail", "has-tooltip");
    editButton.classList.add("btn-detail", "has-tooltip");
    deleteButton.classList.add("btn-detail", "has-tooltip");
    ratingButton.classList.add("btn-detail", "has-tooltip");

    moreDetailsButton.setAttribute("data-tooltip", "Więcej szczegółów");
    editButton.setAttribute("data-tooltip", "Edytuj");
    deleteButton.setAttribute("data-tooltip", "Usuń");
    ratingButton.setAttribute("data-tooltip", "Zobacz oceny lub dodaj swoją ");



    moreDetailsButton.setAttribute("id", "moreDetails");
    moreDetailsButton.setAttribute("onclick", "event.stopPropagation()");


    ratingButton.setAttribute("id", "ratingDetails");
    ratingButton.setAttribute("onclick", "event.stopPropagation()");

    editButton.setAttribute("id", "editDetails");
    editButton.setAttribute("onclick", "event.stopPropagation()");

    deleteButton.setAttribute("id", "deleteDetails");
    deleteButton.setAttribute("onclick", "event.stopPropagation()");


    moreDetailsButton.textContent = "↗️ Szczegóły";
    ratingButton.textContent = "⭐ Ocena";
    editButton.textContent = "✏️";
    deleteButton.textContent = "❌";
    



    moreDetailsButton.addEventListener("click", () => renderDetailsSubpage(item.id, itemType));

    editButton.addEventListener("click", () => renderEditItemSubpage(item.id, itemType));

    deleteButton.addEventListener("click", () => renderDeleteItemSubpage(item.id, itemType));
    ratingButton.addEventListener("click", () => renderRatingSubpage(item.id, itemType));

    detailsButtonsDiv.appendChild(moreDetailsButton);
    
    detailsButtonsDiv.appendChild(ratingButton);
    detailsButtonsDiv.appendChild(editButton);
    detailsButtonsDiv.appendChild(deleteButton);


    return detailsButtonsDiv;
}

export function createTileCard(item: ItemDTO): HTMLElement {
    const cardTile = document.createElement("div");
    cardTile.classList.add("tile-card");

    const divTileSummary = document.createElement("div");
    divTileSummary.classList.add("tile-summary");
    divTileSummary.addEventListener("click", () => toggleTile(cardTile));

    const divTileDetails = document.createElement("div");
    divTileDetails.classList.add("tile-details");

    const divTileDetailsInner = document.createElement("div");
    divTileDetailsInner.classList.add("details-inner");

    divTileDetails.appendChild(divTileDetailsInner);

    cardTile.appendChild(divTileSummary);
    cardTile.appendChild(divTileDetails);

    return cardTile;
}

export function toggleTile(cardElement) {
    // OPCJONALNIE: Jeśli chcesz zamknąć inne kafelki przed otwarciem tego, odkomentuj poniższe linie:

    const allCards = document.querySelectorAll('.tile-card');
    allCards.forEach(card => {
        if (card !== cardElement) card.classList.remove('active');
    });

    // Przełącza klasę active na klikniętym kafelku
    cardElement.classList.toggle('active');
}