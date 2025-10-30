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

        public async Task<RatingDto> GetAlbumRatingById(int ratingId)
        {
            var rating = await _dbContext.AlbumRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);
            if (rating is null)
                throw new NotFoundException($"Rating not found");

            var ratingDto = _mapper.Map<RatingDto>(rating);
            return ratingDto;
        }

        public async Task<IEnumerable<RatingDto>> GetAlbumRatings(int albumId)
        {
            var ratings = await _dbContext.AlbumRatings
                .Where(r => r.AlbumId == albumId)
                .ToListAsync();
            var ratingsDto = _mapper.Map<IEnumerable<RatingDto>>(ratings);
            return ratingsDto;
        }

        public async Task<RatingDto> GetMyAlbumRatings(int albumId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var rating = await _dbContext.AlbumRatings
                .FirstOrDefaultAsync(r => r.AlbumId == albumId && r.CreateUserId == currentUserId);
            if (rating is null)
                throw new NotFoundException("Rating not found");
            var ratingDto = _mapper.Map<RatingDto>(rating);
            return ratingDto;
        }

        public async Task<AlbumRating> CreateAlbumRating(RatingDto ratingDto, int albumId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var existingRating = await _dbContext.AlbumRatings
                .FirstOrDefaultAsync(r => r.AlbumId == albumId && r.CreateUserId == currentUserId);
            if (existingRating is not null)
                throw new ForbidException("You have already rated this album");

            var album = await GetAlbumById(albumId);
            var newRating = _mapper.Map<AlbumRating>(ratingDto);
            newRating.AlbumId = albumId;
            newRating.CreateUserId = currentUserId;
            newRating.CreatedAt = DateTime.Now;
            newRating.CreateUserId = currentUserId;
            await _dbContext.AlbumRatings.AddAsync(newRating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentAlbumInDb(albumId);
            return newRating;

        }

        public async Task<AlbumRating> UpdateAlbumRatingById(RatingDto ratingDto, int ratingId, string authorization)
        {
            var updatedRating =  await _dbContext.AlbumRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);
            if (updatedRating is null)
                throw new NotFoundException("Rating not found");

            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            if (updatedRating.CreateUserId != currentUserId)
                throw new ForbidException("You are not authorized to update this rating");

            updatedRating.Value = ratingDto.Value;
            updatedRating.Comment = ratingDto.Comment;
            updatedRating.LastUpdatedAt = DateTime.Now;
            updatedRating.LastUpdateUserId = currentUserId;

            _dbContext.AlbumRatings.Update(updatedRating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentAlbumInDb(updatedRating.AlbumId);
            return updatedRating;
        }


        public async Task DeleteAllAlbumRatings(int albumId)
        {
            var ratings = await _dbContext.AlbumRatings
                .Where(r => r.AlbumId == albumId)
                .ToListAsync();

            _dbContext.AlbumRatings.RemoveRange(ratings);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentAlbumInDb(albumId);
        }

        public async Task DeleteAlbumRatingById(int ratingId)
        {
            var rating = await _dbContext.AlbumRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);
            if (rating is null)
                throw new NotFoundException("Rating not found");

            _dbContext.AlbumRatings.Remove(rating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentAlbumInDb(rating.AlbumId);
        }

        public async Task DeleteMyAlbumRatings(int albumId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var rating = await _dbContext.AlbumRatings
                .FirstOrDefaultAsync(r => r.AlbumId == albumId && r.CreateUserId == currentUserId);
            if (rating is null)
                throw new NotFoundException("Rating not found");
            _dbContext.AlbumRatings.Remove(rating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentAlbumInDb(albumId);
        }

        private async Task UpdateAverageRatingForCurrentAlbumInDb(int albumId)
        {
            var album = await GetAlbumById(albumId);
            album.AverageRating = ServiceHelper.CountAverageRating(album.Ratings.Select(r => r.Value));
            _dbContext.Albums.Update(album);
            await _dbContext.SaveChangesAsync();
        }

        private async Task<Album> GetAlbumById(int albumId)
        {
            var album = await _dbContext.Albums
                .Include(a => a.Ratings)
                .FirstOrDefaultAsync(a => a.Id == albumId);
            if (album is null)
                throw new NotFoundException("Album not found");

            return album;
        }
    }
}
