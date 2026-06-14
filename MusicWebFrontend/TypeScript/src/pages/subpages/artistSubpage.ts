import { getPagedItemsFromApi } from "../../Utils/apiCommunication.js";
import type { ArtistDto } from "../../DTO/ItemsDto.js";
import {createDetailsButtonsDiv,
        createMainContentContainerElement,
        createTileCard
        } from "./sharedSuppage.js";
import { mainURL } from "../../app.js";

export function createArtistCard(artistDto: ArtistDto): HTMLElement {
    const cardTile = createTileCard(artistDto);
    const tileSummary = cardTile.querySelector(".tile-summary");
    if (tileSummary) {
        const nameElement = document.createElement("h3");
        nameElement.classList.add("tile-first-name");
        nameElement.textContent = artistDto.name;

        const ratingElement = document.createElement("p");
        ratingElement.classList.add("tile-rating");
        const ratingValue =
            (artistDto.averageRating !== null && artistDto.averageRating > 0) ? artistDto.averageRating.toString() : "Brak oceny";
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
        //const description = `lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("tile-description");
        descriptionElement.innerHTML = `<p><strong>Opis:</strong></p><p>${description}</p>`;

        const detailsButtons = createDetailsButtonsDiv(artistDto, "artist");
        
        tileDetails.appendChild(descriptionElement);
        tileDetails.appendChild(detailsButtons);
    }
    return cardTile;
}

export const displayArtistsPage = async () => {

    const header = "Artyści";
    const subheader = `<p>Ta strona zawiera listę artystów, którzy są dostępni w naszej bibliotece.</p>
    <p>Wybierz artystę, aby dowiedzieć się wiecej.</p>`;

    let mainContent = document.querySelector(".main-content") as HTMLElement;
    const newMainContent = createMainContentContainerElement(header, subheader);

    const TilesGrid = newMainContent.querySelector(".tiles-grid") as HTMLElement;
    const padedResult = await getPagedItemsFromApi(mainURL + "artist");
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
            artistsData.forEach((artistDto: ArtistDto) => {
                const artistTile = createArtistCard(artistDto);
                TilesGrid.appendChild(artistTile);
            });
        
        }
    }
    mainContent.replaceWith(newMainContent);
}