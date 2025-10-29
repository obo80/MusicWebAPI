using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAlbumRatingService
    {
        Task<IEnumerable<RatingDto>> GetAlbumRatings(int albumId);
        Task<RatingDto> GetAlbumRatingById(int ratingId);
        Task<AlbumRating> CreateAlbumRating(RatingDto ratingDto, int albumId);
        Task<AlbumRating> UpdateAlbumRatingById(RatingDto ratingDto, int ratingId);
        Task DeleteAlbumRatingById(int ratingId);
        Task DeleteAllAlbumRatings(int albumId);
    }
}
