using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO
{
    public class CreateSongDto
    {
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        public int? Lenght { get; set; }   // Length in seconds
        public int? ReleasedYear { get; set; }


        public int? AlbumId { get; set; }

        //public virtual Album? Album { get; set; }

        //public virtual Artist Artist { get; set; }

        
    }
}