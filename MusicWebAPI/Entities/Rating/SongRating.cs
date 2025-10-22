namespace MusicWebAPI.Entities.Rating
{
    public class SongRating :Rating
    {
        public int SongId { get; set; }
        public Song Song { get; set; }
    }
}
