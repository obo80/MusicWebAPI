import { renderDetailsSubpage, renderRatingSubpage } from "./sharedDetailsSubpage.js";
export function createMainContentContainerElement(header, subheader) {
    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content");
    const mainHeaderElement = document.createElement("div");
    mainHeaderElement.classList.add("main-header");
    const headerElement = document.createElement("h1");
    headerElement.textContent = header;
    const subheaderElement = document.createElement("h2");
    subheaderElement.innerHTML = subheader;
    mainHeaderElement.appendChild(headerElement);
    mainHeaderElement.appendChild(subheaderElement);
    //Kontener na całą siatkę kafelków
    const tileContainer = document.createElement("div");
    tileContainer.classList.add("tiles-query-grid");
    const queryContainer = document.createElement("div");
    queryContainer.classList.add("query-container");
    queryContainer.textContent = "Tutaj będzie można filtrować i sortować wyniki.-- PLACEHOLDER";
    // Dodajemy kontener zapytań do głównej zawartości - to do na potem
    const tilesGrid = document.createElement("div");
    tilesGrid.classList.add("tiles-grid");
    tileContainer.appendChild(queryContainer);
    tileContainer.appendChild(tilesGrid);
    mainContent.appendChild(mainHeaderElement);
    mainContent.appendChild(tileContainer);
    return mainContent;
}
export function createDetailsButtonsDiv(item, itemType) {
    const detailsButtonsDiv = document.createElement("div");
    detailsButtonsDiv.classList.add("details-buttons");
    const moreDetailsButton = document.createElement("button");
    //const editButton = document.createElement("button");
    const ratingButton = document.createElement("button");
    moreDetailsButton.classList.add("btn-detail");
    //editButton.classList.add("btn-detail");
    ratingButton.classList.add("btn-detail");
    moreDetailsButton.setAttribute("id", "moreDetails");
    moreDetailsButton.setAttribute("onclick", "event.stopPropagation()");
    // editButton.setAttribute("id", "editDetails");
    // editButton.setAttribute("onclick", "event.stopPropagation()");
    ratingButton.setAttribute("id", "ratingDetails");
    ratingButton.setAttribute("onclick", "event.stopPropagation()");
    moreDetailsButton.textContent = "Więcej szczegółów";
    //editButton.textContent = "Edycja";
    ratingButton.textContent = "Ocena";
    moreDetailsButton.addEventListener("click", () => renderDetailsSubpage(item.id, itemType));
    // editButton.addEventListener("click", () => {
    //     // Obsługa kliknięcia przycisku "Edycja"
    //     console.log(`Kliknięto "Edycja" dla elementu o ID: ${item.id}, typeof: ${itemType}`);
    // });
    ratingButton.addEventListener("click", () => renderRatingSubpage(item.id, itemType));
    detailsButtonsDiv.appendChild(moreDetailsButton);
    //detailsButtonsDiv.appendChild(editButton);
    detailsButtonsDiv.appendChild(ratingButton);
    return detailsButtonsDiv;
}
export function createTileCard(item) {
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
        if (card !== cardElement)
            card.classList.remove('active');
    });
    // Przełącza klasę active na klikniętym kafelku
    cardElement.classList.toggle('active');
}
//# sourceMappingURL=sharedSuppage.js.map