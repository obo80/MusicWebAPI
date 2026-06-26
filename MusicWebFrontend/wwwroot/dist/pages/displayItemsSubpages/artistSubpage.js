var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createDetailsButtonsDiv, createMainContentContainerElement, createTileCard } from "./sharedSuppage.js";
import { mainURL } from "../../app.js";
import { getPagedItemsFromApi } from "../../Infrastructure/ApiCommunication/ApiItems.js";
export function createArtistCard(artistDto) {
    const cardTile = createTileCard(artistDto);
    const tileSummary = cardTile.querySelector(".tile-summary");
    if (tileSummary) {
        const nameElement = document.createElement("h3");
        nameElement.classList.add("tile-first-name");
        nameElement.textContent = artistDto.name;
        const ratingElement = document.createElement("p");
        ratingElement.classList.add("tile-rating");
        const ratingValue = (artistDto.averageRating !== null && artistDto.averageRating > 0) ? artistDto.averageRating.toString() : "Brak oceny";
        ratingElement.innerHTML =
            `Ocena: <span class="tile-rating">${ratingValue}</span>`;
        const tileArrow = document.createElement("span");
        tileArrow.classList.add("tile-arrow");
        tileArrow.innerHTML = "▼";
        tileSummary.appendChild(nameElement);
        tileSummary.appendChild(ratingElement);
        tileSummary.appendChild(tileArrow);
    }
    const tileDetails = cardTile.querySelector(".details-inner");
    if (tileDetails) {
        const description = artistDto.description ? artistDto.description : "Brak opisu";
        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("tile-description");
        descriptionElement.innerHTML = `<p><strong>Opis:</strong></p><p>${description}</p>`;
        const detailsButtons = createDetailsButtonsDiv(artistDto, "artist");
        tileDetails.appendChild(descriptionElement);
        tileDetails.appendChild(detailsButtons);
    }
    return cardTile;
}
export const displayArtistsPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const header = "Artyści";
    const subheader = `<p>Ta strona zawiera listę artystów, którzy są dostępni w naszej bibliotece.</p>
    <p>Wybierz artystę, aby dowiedzieć się wiecej.</p>`;
    let mainContent = document.querySelector(".main-content");
    const newMainContent = createMainContentContainerElement(header, subheader, "artist");
    const TilesGrid = newMainContent.querySelector(".tiles-grid");
    const padedResult = yield getPagedItemsFromApi(mainURL + "artist");
    if (!padedResult) {
        console.error("Nie można pobrać danych o artystach.");
        TilesGrid.textContent = "Bład: Nie można pobrać danych o artystach.";
    }
    else if (padedResult.items.length === 0) {
        TilesGrid.textContent = "Brak artystów do wyświetlenia.";
    }
    else {
        const artistsData = padedResult.items;
        if (artistsData) {
            artistsData.forEach((artistDto) => {
                const artistTile = createArtistCard(artistDto);
                TilesGrid.appendChild(artistTile);
            });
        }
    }
    mainContent.replaceWith(newMainContent);
});
//# sourceMappingURL=artistSubpage.js.map