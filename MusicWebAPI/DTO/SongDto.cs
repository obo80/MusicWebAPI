using MusicWebAPI.Entities;

namespace MusicWebAPI.DTO
{
    internal class SongDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }

        public virtual Album Album { get; set; }

        public virtual Artist Artist { get; set; }
    }
}