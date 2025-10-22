using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO
{
    internal class AlbumDto
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string? Description { get; set; }
        public int ArtistId { get; set; }

        public virtual Artist Artist { get; set; }

        public virtual ICollection<Song>? Songs { get; set; }
        public virtual ICollection<AlbumRating>? Ratings { get; set; }
    }
}