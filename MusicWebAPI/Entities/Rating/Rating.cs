using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.Entities.Rating
{
    public abstract class Rating
    {
        public int Id { get; set; }
        public int Value { get; set; }       // Rating value, e.g., 1-5
        public string? Comment { get; set; }


        public int CreateUserId { get; set; }      // Who rated
        public int LastUpdateUserId { get; set; }      // Who rated

        public DateTime CreatedAt { get; set; }
         public DateTime LastUpdatedAt { get; set; }


    }
}
