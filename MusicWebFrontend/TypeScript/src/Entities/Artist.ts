import { AlbumDto, ArtistDto, ArtistRatingDto, SongDto } from "../DTO/ItemsDto.js";

export class Artist implements ArtistDto {
    id: number;
    name: string;
    albums: AlbumDto[];
    songs: SongDto[];
    ratings: ArtistRatingDto[];
    description?: string;
    averageRating?: number;
    constructor(id: number, name: string,
        albums: AlbumDto[], songs: SongDto[],
        ratings: ArtistRatingDto[], averageRating?: number,
        description?: string)
    {
        this.id = id;
        this.name = name;
        this.albums = albums;
        this.songs = songs;
        this.ratings = ratings;
        this.description = description;
        this.averageRating = averageRating;
    }
    showDetails(id: number): void {
        console.log(`Showing details for artist with ID: ${id}`);
        throw new Error("Method not implemented.");
    }
    editDetails(id: number): void {
        throw new Error("Method not implemented.");
    }
    rateItem(id: number): void {
        throw new Error("Method not implemented.");
    }
}