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
import { getPagedItemsFromApi } from "../../Utils/apiCommunication.js";
import { createDivByClassName } from "../../Utils/helpers.js";
import { createTileCard, createDetailsButtonsDiv, createMainContentContainerElement } from "./sharedSuppage.js";
export function createSongCard(songDto) {
    const cardTile = createTileCard(songDto);
    const tileSummary = cardTile.querySelector(".tile-summary");
    if (tileSummary) {
        const titleElement = document.createElement("h3");
        titleElement.classList.add("tile-first-name");
        titleElement.textContent = songDto.title;
        const artistName = songDto.artistName ? songDto.artistName : "Nieznany artysta";
        const artistElement = document.createElement("h4");
        artistElement.classList.add("tile-second-name");
        artistElement.textContent = artistName;
        const ratingElement = document.createElement("p");
        ratingElement.classList.add("tile-rating");
        const ratingValue = (songDto.averageRating !== null && songDto.averageRating > 0) ? songDto.averageRating.toString() : "Brak oceny";
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
        const releasedYear = songDto.releasedYear ? songDto.releasedYear.toString() : "Nieznany";
        const lenght = songDto.lenght ? songDto.lenght.toString() + " sekund" : "Nieznana długosć";
        const divdetailsInfo = createDivByClassName("tile-details-info");
        divdetailsInfo.innerHTML = `<p><strong>Rok wydania:</strong> ${releasedYear}</p>
                                    <p><strong>Długość:</strong> ${lenght}</p>`;
        const description = songDto.description ? songDto.description : "Brak opisu";
        const descriptionElement = createDivByClassName("tile-description");
        descriptionElement.innerHTML = `<p><strong>Opis:</strong></p><p>${description}</p>`;
        const detailsButtons = createDetailsButtonsDiv(songDto, "song");
        tileDetails.appendChild(divdetailsInfo);
        tileDetails.appendChild(descriptionElement);
        tileDetails.appendChild(detailsButtons);
    }
    return cardTile;
}
export const displaySongsPage = () => __awaiter(void 0, void 0, void 0, function* () {
    //alert("Wyświetlanie strony utworów");
    const header = "Utwory";
    const subheader = `<p>Ta strona zawiera listę utworów, które są dostępne w naszej bibliotece.</p>
    <p>Wybierz utwór, aby dowiedzieć się wiecej.</p>`;
    let mainContent = document.querySelector(".main-content");
    const newMainContent = createMainContentContainerElement(header, subheader, "song");
    const TilesGrid = newMainContent.querySelector(".tiles-grid");
    const padedResult = yield getPagedItemsFromApi(mainURL + "song");
    if (!padedResult) {
        console.error("Nie można pobrać danych o utworach.");
        TilesGrid.textContent = "Bład: Nie można pobrać danych o utworach.";
    }
    else if (padedResult.items.length === 0) {
        TilesGrid.textContent = "Brak utworów do wyświetlenia.";
    }
    else {
        const songsData = padedResult.items;
        if (songsData) {
            //console.log("Pobrano dane utworów:", songsData);
            songsData.forEach((songDto) => {
                const songTile = createSongCard(songDto);
                TilesGrid.appendChild(songTile);
            });
        }
    }
    mainContent.replaceWith(newMainContent);
});
//# sourceMappingURL=songSupbpage.js.map