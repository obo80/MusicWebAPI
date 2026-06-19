export { CreateArtistDto, CreateAlbumDto, CreateSongDto, SelectOptionsDto }
interface CreateArtistDto {
    name: string;
    description: string;
}
interface CreateAlbumDto {
    //artistId: number;
    title: string;
    releasedYear: number;
    genreId: number;
    description: string;
}

interface CreateSongDto {
    title: string;
    description: string;
}

interface SelectOptionsDto {
    value: number;
    text: string;
}
