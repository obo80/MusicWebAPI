namespace MusicWebAPI.Entities.Rating
{
    public class AlbumRating : Rating
    {
        public  int  AlbumId { get; set; }
        public Album Album { get; set; }
    }
}
