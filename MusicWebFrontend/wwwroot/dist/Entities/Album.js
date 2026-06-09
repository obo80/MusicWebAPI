class Album {
    constructor(id, title, releasedYear, artistId, artistName, genreId, genreName, songs, ratings, description, averageRating) {
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
    showDetails(id) {
        console.log(`Showing details for album with ID: ${id}`);
    }
    editDetails(id) {
        throw new Error("Method not implemented.");
    }
    rateItem(id) {
        throw new Error("Method not implemented.");
    }
}
export {};
//# sourceMappingURL=Album.js.map