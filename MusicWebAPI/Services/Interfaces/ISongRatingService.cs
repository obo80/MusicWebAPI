using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.Services.Interfaces
{
    public interface ISongRatingService
    {
        Task<IEnumerable<RatingDto>> GetSongRatings(int songId);
        Task<RatingDto> GetSongRatingById(int ratingId);
        Task<RatingDto> GetMySongRatings(int songId, string authorization);
        Task<SongRating> CreateSongRating(RatingDto ratingDto, int songId, string authorization);
        Task<SongRating> UpdateSongRatingById(RatingDto ratingDto, int ratingId, string authorization);
        Task DeleteSongRatingById(int ratingId);
        Task DeleteAllSongRatings(int songId);
        Task DeleteMySongRatings(int songId, string authorization);
    }
}
