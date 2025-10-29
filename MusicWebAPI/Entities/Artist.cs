using MusicWebAPI.Entities.Rating;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MusicWebAPI.Entities
{
    public class Artist
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string? Description { get; set; }


        public virtual ICollection<Album>? Albums { get; set; }
        public virtual ICollection<Song>? Songs { get; set; }

        public virtual ICollection<ArtistRating>? Ratings { get; set; }
        public double AverageRating { get; set; }



    }
}
