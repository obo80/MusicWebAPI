using MusicWebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO
{
    public class CreateArtistDto
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Album>? Albums { get; set; }
        public virtual ICollection<Song>? Songs { get; set; }
    }
}
