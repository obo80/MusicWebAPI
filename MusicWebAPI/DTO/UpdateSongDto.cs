namespace MusicWebAPI.DTO
{
    public record UpdateSongDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int? Lenght { get; set; }   // Length in seconds
        public int? ReleasedYear { get; set; }

        public int? AlbumId { get; set; }
    }
}
