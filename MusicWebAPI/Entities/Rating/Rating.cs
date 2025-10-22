using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.Entities.Rating
{
    public abstract class Rating
    {
        public int Id { get; set; }



        public int UserId { get; set; }      // Who rated
        public int Value { get; set; }       // Rating value, e.g., 1-5
        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; }


    }
}
