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
import { getItemFromApi, getPagedItemsFromApi } from "../../functions/apiCommunication.js";
import { createDivByClassName } from "../../functions/helpers.js";
import { renderAlbumDetailsContainer } from "./albumIdDetailsSubpage.js";
let activeAlbum = null;
function setActiveAlbum(albumTitle) {
    if (activeAlbum) {
        activeAlbum.classList.remove("active-album");
    }
    albumTitle.classList.add("active-album");
    activeAlbum = albumTitle;
}
export function renderArtistDetailsPage(artistId) {
    return __awaiter(this, void 0, void 0, function* () {
        const mainDetailsContainer = document.querySelector(".main-details-container");
        if (!mainDetailsContainer) {
            console.log("main element was't found");
            return;
        }
        //get data from api
        const url = mainURL + "artist/" + artistId;
        //console.log(url);
        const artistDto = yield getArtistDtoFromApi(url);
        //eror - artist not found
        if (!artistDto) {
            console.log("artist not found");
            mainDetailsContainer.textContent = "Artysta nie znaleziony.";
            return;
        }
        const albumsDto = yield getAlbumsFromApi(url + "/album");
        //left side for artist name, rating and description
        const leftDivContainer = createLeftDivContainer(artistDto);
        //right side for discography and albums details with song list
        const rightDivContainer = createRightDivContainer(albumsDto);
        mainDetailsContainer.appendChild(leftDivContainer);
        mainDetailsContainer.appendChild(rightDivContainer);
    });
}
function getArtistDtoFromApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const artistDto = yield getItemFromApi(url);
        return artistDto;
    });
}
function getAlbumsFromApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const pagedResultAlbums = yield getPagedItemsFromApi(url);
        if (!pagedResultAlbums) {
            console.log("albums not found");
            return [];
        }
        const albums = pagedResultAlbums.items;
        return albums;
    });
}
function createLeftDivContainer(artistDto) {
    const leftDivContainer = createDivByClassName("artist-details-left-container");
    const artistNameDiv = createDivByClassName("artist-details-name");
    const artistName = artistDto.name ? artistDto.name : "Nieznany artysta";
    artistNameDiv.textContent = artistName;
    const artistRatingsDiv = createDivByClassName("artist-details-ratings");
    const rating = (artistDto.averageRating || artistDto.averageRating > 0) ? artistDto.averageRating.toString() : "Brak oceny";
    artistRatingsDiv.innerHTML = `<span style="font-weight: bold;">Ocena: </span>` + rating; //("Ocena: );
    const artistDescriptionDiv = createDivByClassName("artist-details-description");
    const artistDescription = artistDto.description ? artistDto.description : "Brak opisu";
    artistDescriptionDiv.innerHTML = artistDescription;
    leftDivContainer.appendChild(artistNameDiv);
    leftDivContainer.appendChild(artistRatingsDiv);
    leftDivContainer.appendChild(artistDescriptionDiv);
    return leftDivContainer;
}
function createRightDivContainer(albums) {
    const artistDetailsRightContainer = createDivByClassName("artist-details-right-container");
    //div header for dicography title
    const discographyheader = createDivByClassName("discography-header");
    discographyheader.textContent = "Dyskografia:";
    artistDetailsRightContainer.appendChild(discographyheader);
    //div container for discography - to divide for left (albums) and right (album details + songs)
    const discographyContainer = createDivByClassName("discography-container");
    artistDetailsRightContainer.appendChild(discographyContainer);
    const albumContainer = createAlbumContainer(albums);
    //add left for albums
    discographyContainer.appendChild(albumContainer);
    return artistDetailsRightContainer;
}
function createAlbumContainer(albums) {
    const albumContainer = createDivByClassName("artist-album-list-container");
    //albumContainer.classList.add("discography-container");
    if (albums.length === 0) {
        albumContainer.textContent = "Brak albumów do wyświetlenia.";
        return albumContainer;
    }
    albums.forEach(album => {
        const albumCard = createAlbumTitleDiv(album);
        albumContainer.appendChild(albumCard);
    });
    return albumContainer;
}
function createAlbumTitleDiv(album) {
    const albumTitleDiv = createDivByClassName("artist-album-title");
    albumTitleDiv.addEventListener("click", () => {
        renderAlbumDetailsContainer(album, albumTitleDiv.parentElement.parentElement);
        setActiveAlbum(albumTitleDiv);
    });
    albumTitleDiv.textContent = album.title;
    return albumTitleDiv;
}
//# sourceMappingURL=artistIdDetailsSubpage.js.map