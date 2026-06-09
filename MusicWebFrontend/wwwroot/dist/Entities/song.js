class Song {
    constructor(id, title, length, releasedYear, albumId, albumName, artistId, artistName, ratings, description, averageRating) {
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
    showDetails(id) {
        console.log(`Showing details for song with ID: ${id}`);
    }
    editDetails(id) {
        throw new Error("Method not implemented.");
    }
    rateItem(id) {
        throw new Error("Method not implemented.");
    }
}
export {};
//# sourceMappingURL=Song.js.map