namespace MusicWebAPI.DTO
{
    public record RatingDto
    {
        public int Value { get; set; }       // Rating value, e.g., 1-5
        public string? Comment { get; set; }
    }
}
