using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.Services.Interfaces
{
    public interface ISongRatingService
    {
        Task<IEnumerable<RatingDto>> GetSongRatings(int songId);
        Task<RatingDto> GetSongRatingById(int ratingId);
        Task<SongRating> CreateSongRating(RatingDto ratingDto, int songId);
        Task<SongRating> UpdateSongRatingById(RatingDto ratingDto, int ratingId);
        Task DeleteSongRatingById(int ratingId);
        Task DeleteAllSongRatings(int songId);
    }
}
