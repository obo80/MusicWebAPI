import { mainURL } from "../../app.js";
import { AlbumDto, ArtistDto } from "../../DTO/ItemsDto.js";
import { Artist } from "../../Entities/Artist.js";
import { getItemFromApi, getPagedItemsFromApi } from "../../functions/apiCommunication.js";
import { createDivByClassName } from "../../functions/helpers.js";
import { renderAlbumDetailsContainer } from "./albumIdDetailsSubpage.js";

let activeAlbum: HTMLDivElement | null = null;
function setActiveAlbum(albumTitle: HTMLDivElement) {
    if (activeAlbum) {
        activeAlbum.classList.remove("active-album");
    }
    albumTitle.classList.add("active-album");
    activeAlbum = albumTitle;
}


export async function renderArtistDetailsPage(artistId: number) {
    const mainDetailsContainer = document.querySelector(".main-details-container");
    if (!mainDetailsContainer) {
        console.log("main element was't found");
        return;
    }

    //get data from api
    const url: string = mainURL + "artist/" + artistId;
    //console.log(url);

    const artistDto = await getArtistDtoFromApi(url);
    //eror - artist not found
    if (!artistDto) {
        console.log("artist not found");
        mainDetailsContainer.textContent = "Artysta nie znaleziony.";
        return;
    }

    const albumsDto = await getAlbumsFromApi(url + "/album");

    //left side for artist name, rating and description
    const leftDivContainer = createLeftDivContainer(artistDto);

    //right side for discography and albums details with song list
    const rightDivContainer = createRightDivContainer(albumsDto);
    
    mainDetailsContainer.appendChild(leftDivContainer);
    mainDetailsContainer.appendChild(rightDivContainer);
}

async function getArtistDtoFromApi(url: string): Promise<ArtistDto | null> {
    const artistDto = await getItemFromApi(url) as ArtistDto;
    return artistDto;
}

async function getAlbumsFromApi(url: string): Promise<AlbumDto[]> {
    const pagedResultAlbums = await getPagedItemsFromApi(url);
    if (!pagedResultAlbums) {
        console.log("albums not found");
        return [];
    }
    const albums = pagedResultAlbums.items as AlbumDto[];
    return albums;
}

function createLeftDivContainer(artistDto: ArtistDto): HTMLDivElement {
    const leftDivContainer = createDivByClassName("artist-details-left-container");

    const artistNameDiv = createDivByClassName("artist-details-name");
    const artistName = artistDto.name ? artistDto.name : "Nieznany artysta";
    artistNameDiv.textContent = artistName;

    const artistRatingsDiv = createDivByClassName("artist-details-ratings");
    const rating: string = (artistDto.averageRating || artistDto.averageRating > 0) ? artistDto.averageRating.toString() : "Brak oceny";
    artistRatingsDiv.innerHTML = `<span style="font-weight: bold;">Ocena: </span>` + rating; //("Ocena: );



    const artistDescriptionDiv = createDivByClassName("artist-details-description");
    const artistDescription = artistDto.description ? artistDto.description : "Brak opisu";
    artistDescriptionDiv.innerHTML = artistDescription;

    leftDivContainer.appendChild(artistNameDiv);
    leftDivContainer.appendChild(artistRatingsDiv);
    leftDivContainer.appendChild(artistDescriptionDiv);

    return leftDivContainer;
}

function createRightDivContainer(albums: AlbumDto[]): HTMLDivElement {
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

function createAlbumContainer(albums: AlbumDto[]): HTMLDivElement {
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

function createAlbumTitleDiv(album: AlbumDto): HTMLDivElement {
    const albumTitleDiv = createDivByClassName("artist-album-title");
    albumTitleDiv.addEventListener("click",
        () => {
            renderAlbumDetailsContainer(album, albumTitleDiv.parentElement.parentElement as HTMLDivElement);
            setActiveAlbum(albumTitleDiv);
        });
    albumTitleDiv.textContent = album.title;

    return albumTitleDiv;

}
