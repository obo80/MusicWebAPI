using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.DTO
{
    public class SongDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int? Lenght { get; set; }    // Length in seconds
        public int? ReleasedYear { get; set; }
        

        public int? AlbumId { get; set; }
        public virtual Album? Album { get; set; }

        public int ArtistId { get; set; }
        public virtual Artist Artist { get; set; }

        public double? AverageRating { get; set; }
        public virtual ICollection<SongRating>? Ratings { get; set; }
    }
}