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

        public async Task<RatingDto> GetSongRatingById(int ratingId)
        {
            var rating = await _dbContext.SongRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);
            if (rating is null)
                throw new NotFoundException($"Rating not found");

            var ratingDto = _mapper.Map<RatingDto>(rating);
            return ratingDto;
        }

        public async Task<IEnumerable<RatingDto>> GetSongRatings(int songId)
        {
            var ratings = await _dbContext.SongRatings
                .Where(r => r.SongId == songId)
                .ToListAsync();
            var ratingsDto = _mapper.Map<IEnumerable<RatingDto>>(ratings);
            return ratingsDto;
        }
        public async Task<RatingDto> GetMySongRatings(int songId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var rating = await _dbContext.SongRatings
                .FirstOrDefaultAsync(r => r.SongId == songId && r.CreateUserId == currentUserId);
            if (rating is null)
                throw new NotFoundException("Rating not found");
            var ratingDto = _mapper.Map<RatingDto>(rating);
            return ratingDto;
        }


        public async Task<SongRating> CreateSongRating(RatingDto ratingDto, int songId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var existingRating = await _dbContext.SongRatings
                .FirstOrDefaultAsync(r => r.SongId == songId && r.CreateUserId == currentUserId);
            if (existingRating is not null)
                throw new ForbidException("You have already rated this song");

            var song = await GetSongById(songId);
            var newRating = _mapper.Map<SongRating>(ratingDto);
            newRating.SongId = songId;
            newRating.CreateUserId = currentUserId;
            newRating.CreatedAt = DateTime.Now;
            newRating.CreateUserId = currentUserId;

            await _dbContext.SongRatings.AddAsync(newRating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentSongInDb(songId);
            return newRating;
        }


        public async Task<SongRating> UpdateSongRatingById(RatingDto ratingDto, int ratingId, string authorization)
        {
            var updatedRating = await _dbContext.SongRatings
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

            _dbContext.SongRatings.Update(updatedRating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentSongInDb(updatedRating.SongId);
            return updatedRating;
        }

        public async Task DeleteAllSongRatings(int songId)
        {
            var ratings = await _dbContext.SongRatings
                .Where(r => r.SongId == songId)
                .ToListAsync();

            _dbContext.SongRatings.RemoveRange(ratings);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentSongInDb(songId);
        }

        public async Task DeleteSongRatingById(int ratingId)
        {
            var rating = await _dbContext.SongRatings
                .FirstOrDefaultAsync(r => r.Id == ratingId);
            if (rating is null)
                throw new NotFoundException("Rating not found");

            _dbContext.SongRatings.Remove(rating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentSongInDb(rating.SongId);
        }
        public async Task DeleteMySongRatings(int songId, string authorization)
        {
            var currentUserId = ServiceHelper.GetUserIdFromClaims(authorization);
            var rating = await _dbContext.SongRatings
                .FirstOrDefaultAsync(r => r.SongId == songId && r.CreateUserId == currentUserId);
            if (rating is null)
                throw new NotFoundException("Rating not found");

            _dbContext.SongRatings.Remove(rating);
            await _dbContext.SaveChangesAsync();
            await UpdateAverageRatingForCurrentSongInDb(songId);
        }

        private async Task UpdateAverageRatingForCurrentSongInDb(int songId)
        {
            var song = await GetSongById(songId);
            song.AverageRating = ServiceHelper.CountAverageRating(song.Ratings.Select(r => r.Value));
            _dbContext.Songs.Update(song);
            await _dbContext.SaveChangesAsync();
        }


        private async Task<Song> GetSongById(int songId)
        {
            var song = await _dbContext.Songs
                .Include(a => a.Ratings)
                .FirstOrDefaultAsync(a => a.Id == songId);
            if (song is null)
                throw new NotFoundException("Song not found");

            return song;
        }

    }
}
