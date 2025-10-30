using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAlbumRatingService
    {
        Task<IEnumerable<RatingDto>> GetAlbumRatings(int albumId);
        Task<RatingDto> GetAlbumRatingById(int ratingId);
        Task<RatingDto> GetMyAlbumRatings(int albumId, string authorization);
        Task<AlbumRating> CreateAlbumRating(RatingDto ratingDto, int albumId, string authorization);
        Task<AlbumRating> UpdateAlbumRatingById(RatingDto ratingDto, int ratingId, string authorization);
        Task DeleteAlbumRatingById(int ratingId);
        Task DeleteAllAlbumRatings(int albumId);
        Task DeleteMyAlbumRatings(int albumId, string authorization);
    }
}
