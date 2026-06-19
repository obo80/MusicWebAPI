using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.DTO
{
    public record UpdateAlbumDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int? ReleasedYear { get; set; }




    }
}