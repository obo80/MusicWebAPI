export class Artist {
    constructor(id, name, albums, songs, ratings, averageRating, description) {
        this.id = id;
        this.name = name;
        this.albums = albums;
        this.songs = songs;
        this.ratings = ratings;
        this.description = description;
        this.averageRating = averageRating;
    }
    showDetails(id) {
        console.log(`Showing details for artist with ID: ${id}`);
        throw new Error("Method not implemented.");
    }
    editDetails(id) {
        throw new Error("Method not implemented.");
    }
    rateItem(id) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=Artist.js.map