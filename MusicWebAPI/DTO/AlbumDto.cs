using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO
{
    public class AlbumDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int? ReleasedYear { get; set; }


        public int ArtistId { get; set; }
        //public virtual Artist Artist { get; set; }
        public string ArtistName { get; set; }

        public int GenreId { get; set; }
        public string GenreName { get; set; }
        //public Genre? Genres { get; set; }

        public double? AverageRating { get; set; }
        public virtual ICollection<Song>? Songs { get; set; }
        public virtual ICollection<AlbumRating>? Ratings { get; set; }
    }
}