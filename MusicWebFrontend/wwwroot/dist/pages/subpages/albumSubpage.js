var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mainURL } from "../../app.js";
import { getPagedItemsFromApi } from "../../functions/apiCommunication.js";
import { createDivByClassName } from "../../functions/helpers.js";
import { createTileCard, createDetailsButtonsDiv, createMainContentContainerElement } from "./sharedSuppage.js";
export function createAlbumCard(albumDto) {
    const cardTile = createTileCard(albumDto);
    const tileSummary = cardTile.querySelector(".tile-summary");
    if (tileSummary) {
        const titleElement = document.createElement("h3");
        titleElement.classList.add("tile-first-name");
        titleElement.textContent = albumDto.title;
        const artistName = albumDto.artistName ? albumDto.artistName : "Nieznany artysta";
        const artistElement = document.createElement("h4");
        artistElement.classList.add("tile-second-name");
        artistElement.textContent = artistName;
        const ratingElement = document.createElement("p");
        ratingElement.classList.add("tile-rating");
        const ratingValue = (albumDto.averageRating !== null && albumDto.averageRating > 0) ? albumDto.averageRating.toString() : "Brak oceny";
        ratingElement.innerHTML =
            `Ocena: <span class="tile-rating">${ratingValue}</span>`;
        const tileArrow = document.createElement("span");
        tileArrow.classList.add("tile-arrow");
        tileArrow.innerHTML = "▼";
        tileSummary.appendChild(titleElement);
        tileSummary.appendChild(artistElement);
        tileSummary.appendChild(ratingElement);
        tileSummary.appendChild(tileArrow);
    }
    const tileDetails = cardTile.querySelector(".details-inner");
    if (tileDetails) {
        const releasedYear = albumDto.releasedYear ? albumDto.releasedYear.toString() : "Nieznany";
        const genreName = albumDto.genreName ? albumDto.genreName : "Nieznany";
        const divdetailsInfo = createDivByClassName("tile-details-info");
        divdetailsInfo.innerHTML = `<p><strong>Rok wydania:</strong> ${releasedYear}</p><p><strong>Gatunek:</strong> ${genreName}</p>`;
        const description = albumDto.description ? albumDto.description : "Brak opisu";
        const descriptionElement = createDivByClassName("tile-description");
        descriptionElement.innerHTML = `<p><strong>Opis:</strong></p><p>${description}</p>`;
        const detailsButtons = createDetailsButtonsDiv(albumDto, "album");
        tileDetails.appendChild(divdetailsInfo);
        tileDetails.appendChild(descriptionElement);
        tileDetails.appendChild(detailsButtons);
    }
    return cardTile;
}
export const displayAlbumsPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const header = "Albumy";
    const subheader = `<p>Ta strona zawiera listę albumów, które są dostępne w naszej bibliotece.</p>
    <p>Wybierz album, aby dowiedzieć się wiecej.</p>`;
    let mainContent = document.querySelector(".main-content");
    const newMainContent = createMainContentContainerElement(header, subheader);
    const TilesGrid = newMainContent.querySelector(".tiles-grid");
    const padedResult = yield getPagedItemsFromApi(mainURL + "album");
    if (!padedResult) {
        console.error("Nie można pobrać danych o albumach.");
        TilesGrid.textContent = "Bład: Nie można pobrać danych o albumach.";
    }
    else if (padedResult.items.length === 0) {
        TilesGrid.textContent = "Brak albumów do wyświetlenia.";
    }
    else {
        const albumsData = padedResult.items;
        if (albumsData) {
            //console.log("Pobrano dane albumów:", albumsData);
            albumsData.forEach((albumDto) => {
                const albumTile = createAlbumCard(albumDto);
                TilesGrid.appendChild(albumTile);
            });
        }
    }
    mainContent.replaceWith(newMainContent);
});
//# sourceMappingURL=albumSubpage.js.map