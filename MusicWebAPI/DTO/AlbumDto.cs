using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.DTO
{
    public record AlbumDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int? ReleasedYear { get; set; }


        public int ArtistId { get; set; }
        //public virtual Artist Artist { get; set; }
        public required string ArtistName { get; set; }

        public int GenreId { get; set; }
        public required string GenreName { get; set; }
        //public Genre? Genres { get; set; }

        public double? AverageRating { get; set; }
        public virtual ICollection<Song>? Songs { get; set; }
        public virtual ICollection<AlbumRating>? Ratings { get; set; }
    }
}