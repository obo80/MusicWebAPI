import { AlbumDto, AlbumRatingDto, SongDto } from "../DTO/ItemsDto";

class Album implements AlbumDto {
    title: string;
    releasedYear?: number;
    artistId?: number;
    artistName?: string;
    genreId?: number;
    genreName?: string;
    songs: SongDto[];
    ratings: AlbumRatingDto[];
    id: number;
    description?: string;
    averageRating?: number;
    constructor(id: number, title: string, releasedYear: number | undefined,
        artistId: number | undefined, artistName: string | undefined,
        genreId: number | undefined, genreName: string | undefined,
        songs: SongDto[], ratings: AlbumRatingDto[],
        description?: string, averageRating?: number)
    {
        this.id = id;
        this.title = title;
        this.releasedYear = releasedYear;
        this.artistId = artistId;
        this.artistName = artistName;
        this.genreId = genreId;
        this.genreName = genreName;
        this.songs = songs;
        this.ratings = ratings;
        this.description = description;
        this.averageRating = averageRating;
    }   

    showDetails(id: number): void {
        console.log(`Showing details for album with ID: ${id}`);
    }
    editDetails(id: number): void {
        throw new Error("Method not implemented.");
    }
    rateItem(id: number): void {
        throw new Error("Method not implemented.");
    }
}