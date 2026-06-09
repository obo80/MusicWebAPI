using MusicWebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO
{
    public record UpdateArtistDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }

    }
}
