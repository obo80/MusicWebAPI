using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.DTO
{
    public class ArtistDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Album>? Albums { get; set; }
        public virtual ICollection<Song>? Songs { get; set; }
        public virtual ICollection<ArtistRating>? Ratings { get; set; }

    }
}