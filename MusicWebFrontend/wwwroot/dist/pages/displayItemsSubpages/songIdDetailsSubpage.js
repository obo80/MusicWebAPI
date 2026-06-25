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
import { getItemFromApi } from "../../Utils/apiCommunication.js";
import { createDivByClassName } from "../../Utils/helpers.js";
export function renderSongDetailsPage(songId) {
    return __awaiter(this, void 0, void 0, function* () {
        const mainDetailsContainer = document.querySelector(".main-details-container");
        if (!mainDetailsContainer) {
            console.log("main element was't found");
            return;
        }
        //get data from api
        const url = mainURL + "song/" + songId;
        const songDto = yield getSongDtoFromApi(url);
        //eror - artist not found
        if (!songDto) {
            console.log("song not found");
            mainDetailsContainer.textContent = "Utwór nie znaleziony.";
            return;
        }
        const songContainer = createDivByClassName("song-container");
        renderSongSongHeaderContainer(songDto, songContainer);
        renderSongSongDetailsContainer(songDto, songContainer);
        mainDetailsContainer.appendChild(songContainer);
    });
}
function getSongDtoFromApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const songDto = yield getItemFromApi(url);
        return songDto;
    });
}
function renderSongSongHeaderContainer(song, songContainer) {
    const songHeaderContainer = createDivByClassName("song-header-container");
    const songTitleDiv = createDivByClassName("song-details-title");
    const artistNameDiv = createDivByClassName("song-header-artist-name");
    const albumTitleDiv = createDivByClassName("song-header-album-title");
    //song title
    const songTitle = (song && song.title) ? song.title : "Brak danych";
    songTitleDiv.innerHTML = songTitle;
    songHeaderContainer.appendChild(songTitleDiv);
    //artist name
    const artistName = (song && song.artistName) ? song.artistName : "Brak danych";
    artistNameDiv.innerHTML = artistName;
    songHeaderContainer.appendChild(artistNameDiv);
    //album title
    const albumTitle = (song && song.albumTitle) ? song.albumTitle : "Brak danych";
    albumTitleDiv.innerHTML = albumTitle;
    songHeaderContainer.appendChild(albumTitleDiv);
    songContainer.appendChild(songHeaderContainer);
}
function renderSongSongDetailsContainer(song, songContainer) {
    const songDetailsContainer = createDivByClassName("song-details-container");
    //rating
    const songDetailsRatingDiv = createDivByClassName("song-details-rating");
    const rating = (song.averageRating || song.averageRating > 0) ? song.averageRating.toString() : "Brak oceny";
    songDetailsRatingDiv.innerHTML = `<span style="font-weight: bold;">Ocena: </span>` + rating; //("Ocena: );
    songDetailsContainer.appendChild(songDetailsRatingDiv);
    //relased year
    const songDetailsReleaseYearDiv = createDivByClassName("artist-album-details-release-year");
    const year = (song.releasedYear || song.releasedYear > 0) ? song.releasedYear.toString() : "Brak infromacji o roku wydania";
    songDetailsReleaseYearDiv.innerHTML = `<span style="font-weight: bold;">Rok wydania: </span>` + year;
    songDetailsContainer.appendChild(songDetailsReleaseYearDiv);
    const songDetailsDescription = createDivByClassName("song-details-description");
    songDetailsDescription.innerHTML = song.description ? song.description.toString() : "Brak opisu";
    songDetailsContainer.appendChild(songDetailsDescription);
    songContainer.appendChild(songDetailsContainer);
}
//# sourceMappingURL=songIdDetailsSubpage.js.map