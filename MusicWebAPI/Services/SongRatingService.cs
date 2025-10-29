using AutoMapper;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Services
{
    public class SongRatingService : ISongRatingService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<SongRatingService> _logger;

        public SongRatingService(MusicWebDbContext dbContext, IMapper mapper, ILogger<SongRatingService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public Task<SongRating> CreateSongRating(RatingDto ratingDto, int songId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAllSongRatings(int songId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteSongRatingById(int ratingId)
        {
            throw new NotImplementedException();
        }

        public Task<RatingDto> GetSongRatingById(int ratingId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<RatingDto>> GetSongRatings(int songId)
        {
            throw new NotImplementedException();
        }

        public Task<SongRating> UpdateSongRatingById(RatingDto ratingDto, int ratingId)
        {
            throw new NotImplementedException();
        }
    }
}
