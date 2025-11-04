using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.Entities;
using MusicWebAPI.Services.Interfaces;
using MusicWebAPI.Exceptions;
using MusicWebAPI.DTO;
using MusicWebAPI.DTO.GetQuery;
using MusicWebAPI.DTO.GetFromQueryOptions;

namespace MusicWebAPI.Services
{
    public class ArtistService : IArtistService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public ArtistService(MusicWebDbContext dbContext, IMapper mapper, ILogger<ArtistService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<PagedResult<ArtistDto>> GetAllArtists(FromQueryOptions queryOptions)
        {
            var artistsQuery = _dbContext.Artists
                .AsQueryable();

            var queryHandler = new QueryHandler<Artist>(queryOptions);
            var artistsQueryApplied = queryHandler.ApplyQueryOptions(artistsQuery);

            var totalItemsCount = queryHandler.SearchPhraseFilteredItems;
            var artists = await artistsQueryApplied.ToListAsync();

            var artistsDto = _mapper.Map<List<ArtistDto>>(artists);
            var pagedResults = new PagedResult<ArtistDto>(artistsDto, totalItemsCount, queryOptions.PageSize, queryOptions.PageNumber);
            //var pagedResults = new PagedResult<ArtistDto>(artistsDto, queryOptions);

            return pagedResults;
        }

        public async Task<ArtistDto> GetArtistsById(int id)
        {
            var artist = await _dbContext.Artists.FindAsync(id);

            if (artist is null)
                throw new NotFoundException("Artist not found");
                //return null;


            var artistDto = _mapper.Map<ArtistDto>(artist);
            return artistDto;
        }


        public async Task<Artist> CreateArtist (CreateArtistDto dto)
        {
            var artist = _mapper.Map<Artist>(dto);
            await _dbContext.Artists.AddAsync(artist);
            await _dbContext.SaveChangesAsync();
            return artist;
        }

 

        public async Task<Artist> UpdateArtist(UpdateArtistDto dto, int id)
        {
            var artist = await _dbContext.Artists.FindAsync(id);

            if (artist is null)
                throw new NotFoundException("Artist not found");

            if (dto.Name != null)
                artist.Name = dto.Name;

            artist.Description = dto.Description;

            await _dbContext.SaveChangesAsync();
            return artist;
        }

        public async Task DeleteArtistById(int id)
        {
            var artist = await _dbContext.
                Artists.FirstOrDefaultAsync(a => a.Id == id);


            if (artist is null)// return false;
                throw new NotFoundException("Artist not found");

            _dbContext.Artists.Remove(artist);
            await _dbContext.SaveChangesAsync();
        }




    }


}
