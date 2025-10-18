using MusicWebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO
{
    public class UpdateArtist
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }

    }
}
