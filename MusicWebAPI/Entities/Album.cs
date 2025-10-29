using MusicWebAPI.Entities.Rating;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MusicWebAPI.Entities
{
    public class Album
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string? Description { get; set; }
        public int? ReleasedYear {  get; set; }

        public Artist Artist { get; set; }
        public int ArtistId { get; set; }

        public  Genre? Genres { get; set; }
        public int GenreId { get; set; }


        public virtual ICollection<Song>? Songs { get; set; }

        public virtual ICollection<AlbumRating>? Ratings { get; set; }
        public double AverageRating { get; set; }

    }
}
