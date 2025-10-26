namespace MusicWebAPI.DTO
{
    public class UpdateSongDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public int? Lenght { get; set; }   // Length in seconds
        public int? ReleasedYear { get; set; }

        public int? AlbumId { get; set; }
    }
}
