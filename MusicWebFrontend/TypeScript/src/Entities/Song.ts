import { SongDto, SongRatingDto } from "../DTO/ItemsDto.js";

class Song implements SongDto {
    title: string;
    length?: number;
    releasedYear?: number;
    albumId?: number;
    albumName?: string;
    artistId?: number;
    artistName?: string;
    ratings: SongRatingDto[];
    id: number;
    description?: string;
    averageRating?: number;

    constructor(id: number, title: string, length: number | undefined,
        releasedYear: number | undefined, albumId: number | undefined, albumName: string | undefined,
        artistId: number | undefined, artistName: string | undefined, ratings: SongRatingDto[],
        description?: string, averageRating?: number)
    {
        this.id = id;
        this.title = title;
        this.length = length;
        this.releasedYear = releasedYear;
        this.albumId = albumId;
        this.albumName = albumName;
        this.artistId = artistId;
        this.artistName = artistName;
        this.ratings = ratings;
        this.description = description;
        this.averageRating = averageRating;
    }

    showDetails(id: number): void {
        console.log(`Showing details for song with ID: ${id}`);
    }
    editDetails(id: number): void {
        throw new Error("Method not implemented.");
    }
    rateItem(id: number): void {
        throw new Error("Method not implemented.");
    }

}