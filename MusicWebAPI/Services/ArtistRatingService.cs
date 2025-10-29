using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
using MusicWebAPI.Exceptions;
using MusicWebAPI.Services.Interfaces;
using MusicWebAPI.Services.ServiceHelpers;

namespace MusicWebAPI.Services
{
    public class ArtistRatingService : IArtistRatingService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<ArtistRatingService> _logger;

        public ArtistRatingService (MusicWebDbContext dbContext, IMapper mapper, ILogger<ArtistRatingService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }



        public async Task<RatingDto> GetArtistRatingById(int ratingId)
        {
            var rating = await _dbContext.ArtistRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);
            if (rating is null)
                throw new NotFoundException($"Rating not found");

            var ratingDto = _mapper.Map<RatingDto>(rating);
            return ratingDto;
        }

        public async Task<IEnumerable<RatingDto>> GetArtistRatings(int artistId)
        {
            var ratings = await _dbContext.ArtistRatings
                .Where(r => r.ArtistId == artistId)
                .ToListAsync();

            var ratingsDto = _mapper.Map<IEnumerable<RatingDto>>(ratings);
            return ratingsDto;
        }

        public async Task<RatingDto> GetMyArtistRatings(int artistId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var myRating = await _dbContext.ArtistRatings
                .FirstOrDefaultAsync(r => r.ArtistId == artistId && r.CreateUserId == currentUserId);
            if (myRating is null)
                throw new NotFoundException("Rating not found");
            var ratingDto = _mapper.Map<RatingDto>(myRating);
            return ratingDto;
        }

        public async Task<ArtistRating> CreateArtistRating(RatingDto ratingDto, int artistId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var existingRating = await _dbContext.ArtistRatings
                .FirstOrDefaultAsync(r => r.ArtistId == artistId && r.CreateUserId == currentUserId);
            if (existingRating != null)
                throw new BadRequestException("User has already rated this artist");

            var artist = await GetArtistById(artistId);
            var newRating = _mapper.Map<ArtistRating>(ratingDto);
            newRating.ArtistId = artistId;
            newRating.CreatedAt = DateTime.Now;
            newRating.CreateUserId = currentUserId;
            await _dbContext.ArtistRatings.AddAsync(newRating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentArtistInDb(artistId);
            return newRating;
        }
        public async Task<ArtistRating> UpdateArtistRatingById(RatingDto ratingDto, int ratingId, string authorization)
        {
           var updatedRating = await _dbContext.ArtistRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);

            if (updatedRating is null)
                throw new NotFoundException("Rating not found");

            var artist = await GetArtistById(updatedRating.ArtistId);

            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            if (updatedRating.CreateUserId != currentUserId)
                throw new UnauthorizedAccessException("User is not authorized to update this rating");

            updatedRating.Value = ratingDto.Value;
            updatedRating.Comment = ratingDto.Comment;
            updatedRating.LastUpdatedAt = DateTime.Now;
            updatedRating.LastUpdateUserId = currentUserId;

            _dbContext.ArtistRatings.Update(updatedRating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentArtistInDb(updatedRating.ArtistId);
            return updatedRating;

        }

        public async Task DeleteAllArtistRatings(int artistId)
        {
            var ratings = await _dbContext.ArtistRatings
                .Where(r => r.ArtistId == artistId)
                .ToListAsync();

            _dbContext.ArtistRatings.RemoveRange(ratings);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentArtistInDb(artistId);
        }

        public async Task DeleteArtistRatingById(int ratingId)
        {
            var rating = await _dbContext.ArtistRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);
            if (rating is null)
                throw new NotFoundException($"Rating not found");

            _dbContext.ArtistRatings.Remove(rating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentArtistInDb(rating.ArtistId);
        }

        public async Task DeleteMyArtistRatings(int artistId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var ratings = await _dbContext.ArtistRatings
                .Where(r => r.ArtistId == artistId && r.CreateUserId == currentUserId)
                .ToListAsync();

            _dbContext.ArtistRatings.RemoveRange(ratings);
            await _dbContext.SaveChangesAsync();
        }

        private async Task UpdateAverageRatingForCurrentArtistInDb (int artistId)
        {
            var artist = await GetArtistById(artistId);
            artist.AverageRating = ServiceHelper.CountAverageRating(artist.Ratings.Select(r => r.Value));
            _dbContext.Artists.Update(artist);
            await _dbContext.SaveChangesAsync();
        }

        private async Task<Artist> GetArtistById(int artistId)
        {
            var artist = await _dbContext.Artists
                .Include(a => a.Ratings)
                .FirstOrDefaultAsync(a => a.Id == artistId);
            if (artist is null)
                throw new NotFoundException($"Artist not found");

            return artist;
        }
    }
}
