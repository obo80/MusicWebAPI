using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO
{
    public record CreateAlbumDto
    {
        [Required]
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int? ReleasedYear { get; set; }

        //[Required]
        //public int ArtistId { get; set; }
        //public virtual Artist Artist { get; set; }

        //public Genre? Genres { get; set; }
        public int? GenreId { get; set; } = 1; //default genre

        public virtual ICollection<Song>? Songs { get; set; }

    }
}