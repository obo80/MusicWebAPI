using AutoMapper;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Services
{
    public class AlbumRatingService : IAlbumRatingService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<AlbumRatingService> _logger;

        public AlbumRatingService(MusicWebDbContext dbContext, IMapper mapper, ILogger<AlbumRatingService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public Task<AlbumRating> CreateAlbumRating(RatingDto ratingDto, int albumId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAlbumRatingById(int ratingId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAllAlbumRatings(int albumId)
        {
            throw new NotImplementedException();
        }

        public Task<RatingDto> GetAlbumRatingById(int ratingId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<RatingDto>> GetAlbumRatings(int albumId)
        {
            throw new NotImplementedException();
        }

        public Task<AlbumRating> UpdateAlbumRatingById(RatingDto ratingDto, int ratingId)
        {
            throw new NotImplementedException();
        }
    }
}
