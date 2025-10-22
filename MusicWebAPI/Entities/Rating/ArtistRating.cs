namespace MusicWebAPI.Entities.Rating
{
    public class ArtistRating :Rating
    {
        public int ArtistId { get; set; }
        public Artist Artist { get; set; }
    }
}
