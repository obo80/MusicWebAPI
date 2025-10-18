using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MusicWebAPI.Entities
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Lenght {  get; set; }

        public int AlbumId { get; set; }
        public virtual Album Album { get; set; }

        public int ArtistId { get; set; }
        public virtual Artist Artist { get; set; }


    }
}
