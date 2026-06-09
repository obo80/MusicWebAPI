export interface ItemDTO {
    id: number;
    description?: string;
    averageRating?: number;
    showDetails(id: number): void
    editDetails(id: number): void;
    rateItem(id: number): void;
}
export interface ArtistDto extends ItemDTO {
    name: string;
    albums: AlbumDto[];
    songs: SongDto[];
    ratings: ArtistRatingDto[];
    
}

export interface AlbumDto extends ItemDTO {
    title: string;
    releasedYear?: number;

    artistId?: number;
    artistName?: string;

    genreId?: number;
    genreName?: string;

    songs: SongDto[];
    ratings: AlbumRatingDto[];
}


export interface SongDto extends ItemDTO {
    title: string;
    lenght?: number;
    releasedYear?: number;

    albumId?: number;
    albumTitle?: string;

    artistId?: number;
    artistName?: string;

    ratings: SongRatingDto[];
}
export interface ArtistRatingDto {
    artistId: number;
    artist: ArtistDto;
}

export interface AlbumRatingDto {
    albumId: number;
    album: AlbumDto;
}

export interface SongRatingDto {
    songId: number;
    song: SongDto;
}