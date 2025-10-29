using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IArtistRatingService
    {
        Task<IEnumerable<RatingDto>> GetArtistRatings(int artistId);
        Task<RatingDto> GetMyArtistRatings(int artistId, string authorization);
        Task<RatingDto> GetArtistRatingById(int ratingId);
        Task<ArtistRating> CreateArtistRating(RatingDto ratingDto, int artistId, string authorization);
        Task<ArtistRating> UpdateArtistRatingById(RatingDto ratingDto,int ratingId, string authorization);
        Task DeleteArtistRatingById(int ratingId);
        Task DeleteAllArtistRatings(int artistId);
        Task DeleteMyArtistRatings(int artistId, string authorization);
    }
}