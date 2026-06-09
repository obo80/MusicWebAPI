import { mainURL } from "../../app.js";
import { SongDto } from "../../DTO/ItemsDto.js";
import { getItemFromApi } from "../../functions/apiCommunication.js";
import { createDivByClassName } from "../../functions/helpers.js";



export async function renderSongDetailsPage(songId: number) {
    const mainDetailsContainer = document.querySelector(".main-details-container");
    if (!mainDetailsContainer) {
        console.log("main element was't found");
        return;
    }

    //get data from api
    const url: string = mainURL + "song/" + songId;
    //console.log(url);

    const songDto = await getSongDtoFromApi(url);
    //eror - artist not found
    if (!songDto) {
        console.log("song not found");
        mainDetailsContainer.textContent = "Utwór nie znaleziony."
        return;
    }

    const songContainer = createDivByClassName("song-container");


    renderSongSongHeaderContainer(songDto, songContainer);
    renderSongSongDetailsContainer(songDto, songContainer);

    mainDetailsContainer.appendChild(songContainer);
}

async function getSongDtoFromApi(url: string):Promise <SongDto | null >  {
    const songDto = await getItemFromApi(url) as SongDto;
    return songDto;
}

function renderSongSongHeaderContainer(song: SongDto, songContainer: HTMLDivElement) {
    const songHeaderContainer = createDivByClassName("song-header-container");

    const songTitleDiv = createDivByClassName("song-details-title");
    const artistNameDiv = createDivByClassName("song-header-artist-name");
    const albumTitleDiv = createDivByClassName("song-header-album-title");

    //song title
    const songTitle: string = (song && song.title) ? song.title : "Brak danych";
    songTitleDiv.innerHTML = songTitle;
    songHeaderContainer.appendChild(songTitleDiv);

    //artist name
    const artistName: string = (song && song.artistName) ? song.artistName : "Brak danych";
    artistNameDiv.innerHTML = artistName;
    songHeaderContainer.appendChild(artistNameDiv);

    //album title
    const albumTitle: string = (song && song.albumTitle) ? song.albumTitle : "Brak danych";
    albumTitleDiv.innerHTML = albumTitle;
    songHeaderContainer.appendChild(albumTitleDiv);

    songContainer.appendChild(songHeaderContainer);
}

function renderSongSongDetailsContainer(song: SongDto, songContainer: HTMLDivElement) {
    const songDetailsContainer = createDivByClassName("song-details-container");


    //rating
    const songDetailsRatingDiv = createDivByClassName("song-details-rating");
    //const rating = album.averageRating ? album.averageRating : 0;
    const rating: string = (song.averageRating || song.averageRating > 0) ? song.averageRating.toString() : "Brak oceny";
    songDetailsRatingDiv.innerHTML = `<span style="font-weight: bold;">Ocena: </span>` + rating; //("Ocena: );
    songDetailsContainer.appendChild(songDetailsRatingDiv);

    //relased year
    const songDetailsReleaseYearDiv = createDivByClassName("artist-album-details-release-year");
    const year: string = (song.releasedYear || song.releasedYear > 0) ? song.releasedYear.toString() : "Brak infromacji o roku wydania";
    songDetailsReleaseYearDiv.innerHTML = `<span style="font-weight: bold;">Rok wydania: </span>` + year;
    songDetailsContainer.appendChild(songDetailsReleaseYearDiv);

    const songDetailsDescription = createDivByClassName("song-details-description");
    songDetailsDescription.innerHTML = song.description ? song.description.toString() : "Brak opisu";
    songDetailsContainer.appendChild(songDetailsDescription);

    songContainer.appendChild(songDetailsContainer);
}
