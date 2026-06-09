import { mainURL } from "../../app.js";
import { AlbumDto, SongDto } from "../../DTO/ItemsDto.js";
import { PagedResultDto } from "../../DTO/PagedResultDto.js";
import { getItemFromApi, getPagedItemsFromApi } from "../../functions/apiCommunication.js";
import { createDivByClassName, createLiByClassName} from "../../functions/helpers.js";



export async function renderAlbumDetailsPage(albumId: number) {
    const mainDetailsContainer = document.querySelector(".main-details-container");
    if (!mainDetailsContainer) {
        console.log("main element was't found");
        return;
    }

    //get data from api
    const url: string = mainURL + "album/" + albumId;
    //console.log(url);

    const albumDto = await getAlbumDtoFromApi(url);
    //eror - artist not found
    if (!albumDto) {
        console.log("album not found");
        mainDetailsContainer.textContent = "Album nie znaleziony.";
        return;
    }

    const albumContainer = createDivByClassName("album-container");
    

    
    //add album header - title and artist
    renderAlbumHeaderContainer(albumDto, albumContainer);
    //add album details
    await renderAlbumDetailsContainer(albumDto, albumContainer);

    mainDetailsContainer.appendChild(albumContainer);
}
async function getAlbumDtoFromApi(url: string): Promise<AlbumDto | null> {
    const artistDto = await getItemFromApi(url) as AlbumDto;
    return artistDto;
}



function renderAlbumHeaderContainer(album: AlbumDto, albumContainer: HTMLDivElement): void {
    const albumHeaderContainer = createDivByClassName("album-header-container");
    const artistNameDiv = createDivByClassName("album-header-artist-name");
    const albumTitleDiv = createDivByClassName("album-header-album-title");

    const albumtitle: string = album ? album.title : "Brak danych";
    albumTitleDiv.innerHTML = albumtitle;
    albumHeaderContainer.appendChild(albumTitleDiv);

    const artistName: string = (album && album.artistName) ? album.artistName : "Brak danych";
    artistNameDiv.innerHTML = artistName;
    albumHeaderContainer.appendChild(artistNameDiv);



    albumContainer.appendChild(albumHeaderContainer);

}



export async function renderAlbumDetailsContainer(album: AlbumDto, albumContainer: HTMLDivElement): Promise<void> {
    const albumDetailsContainer = createDivByClassName("artist-album-details-container");
    //top div for album details
    const albumDetailsTopContainer = createDivByClassName("artist-album-details-top-container");

    //rating
    const albumDetailsRatingDiv = createDivByClassName("artist-album-details-rating");
    const rating: string = (album.averageRating || album.averageRating > 0) ? album.averageRating.toString() : "Brak oceny";
    albumDetailsRatingDiv.innerHTML = `<span style="font-weight: bold;">Ocena: </span>` + rating; //("Ocena: );
    albumDetailsTopContainer.appendChild(albumDetailsRatingDiv);

    const albumDetailsReleaseYearDiv = createDivByClassName("artist-album-details-release-year");
    const year: string = (album.releasedYear || album.releasedYear > 0) ? album.releasedYear.toString() : "Brak infromacji o roku wydania";
    albumDetailsReleaseYearDiv.innerHTML = `<span style="font-weight: bold;">Rok wydania: </span>` + year;
    albumDetailsTopContainer.appendChild(albumDetailsReleaseYearDiv);

    const albumDetailsGenreDiv = createDivByClassName("artist-album-details-genre");
    const genre: string = (album.genreName) ? album.genreName.toString() : "Brak infromacji o gatunku";
    albumDetailsGenreDiv.innerHTML = `<span style="font-weight: bold;" > Gatunek: </span>` + genre;
    albumDetailsTopContainer.appendChild(albumDetailsGenreDiv);

    const albumDetailsDescription = createDivByClassName("artist-album-details-description");
    albumDetailsDescription.innerHTML = album.description ? album.description.toString() : "Brak opisu";
    // albumDetailsDescription.innerHTML = `<p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</br> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    // `;

    albumDetailsTopContainer.appendChild(albumDetailsDescription);


    const albumBottomContainerForSongs = await renderAlbumSongsContainer(album.id);


    albumDetailsContainer.appendChild(albumDetailsTopContainer);
    albumDetailsContainer.appendChild(albumBottomContainerForSongs);

    if (albumContainer.querySelector(".artist-album-details-container")) {
        albumContainer.removeChild(albumContainer.querySelector(".artist-album-details-container") as HTMLDivElement);
    }
    albumContainer.appendChild(albumDetailsContainer);
}

async function renderAlbumSongsContainer(albumId: number): Promise<HTMLDivElement> {
    const songsContainer = createDivByClassName("artist-album-song-list-container");
    //temp
    songsContainer.innerHTML = `<h3 class="artist-album-song">Utwory:</h3>`;
    // <div class="artist-album-song">Jakaś pioenka</div>
    // <div class="artist-album-song">Wesoła piosenka</div>
    // <div class="artist-album-song">Inna pieśń</div>
    // <div class="artist-album-song">Jakaś pierdoła</div>
    // <div class="artist-album-song">Dziwny utwór</div>
    // <div class="artist-album-song">Przebój nad przeboje</div>
    // <div class="artist-album-song">Gowniany hit na eurowizje</div>
    // <div class="artist-album-song">Tego lepiej nie słuchaj</div>
    // <div class="artist-album-song">To nawet może być</div>
    // <div class="artist-album-song">A to już kompletna padak, ale trzeba było coś dodać</div>`


    const url: string = mainURL + "album/" + albumId + "/songs";
    const songsDto: SongDto[] = await getSongsDtoForAlbumFromApi(url);

    if (songsDto && songsDto.length > 0) {
            for (const song of songsDto) {
                const songDiv = createDivByClassName("artist-album-song");
                const songLi = createLiByClassName("artist-album-song");
                songDiv.innerHTML = song.title ? song.title : "Brak danych o utworze";
                songsContainer.appendChild(songDiv);
            }
    }
    else {
        const songDiv = createDivByClassName("artist-album-song");
        const songLi = createLiByClassName("artist-album-song");
        songDiv.innerHTML = "Brak utworów na albumie.";
        songsContainer.appendChild(songDiv);
    }


    return songsContainer;
}

async function getSongsDtoForAlbumFromApi(url: string): Promise<SongDto[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch data from ${url}. Status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as PagedResultDto<SongDto>;
        console.log(`Data fetched from ${url}:`);
        // console.log("A dane to:", data);
        return data.items;

    } catch (error) {
        console.error("Error fetching items:", error);
        return null;
    }

}