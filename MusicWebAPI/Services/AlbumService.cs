using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Exceptions;
using MusicWebAPI.Services.Interfaces;
using MusicWebAPI.Utils.GetFromQueryOptions;

namespace MusicWebAPI.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;

        public AlbumService(MusicWebDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        public async Task<PagedResult<AlbumDto>> GetAllAlbums(FromQueryOptions queryOptions)
        {
            var albumsQuery = _dbContext.Albums.Include(a => a.Artist)
                .AsQueryable();

            var pagedResult = await GetPagedResultForAlbumQuery(queryOptions, albumsQuery);
            return pagedResult;
        }

        public async Task<PagedResult<AlbumDto>> GetAllAlbums(int artistId, FromQueryOptions queryOptions)
        {
            var artist = await GetArtistById(artistId);
            var albumsQuery = _dbContext.Albums
                .Where(al => al.ArtistId == artistId)
                .AsQueryable();

            var pagedResult = await GetPagedResultForAlbumQuery(queryOptions, albumsQuery);
            return pagedResult;
        }




        public async Task<AlbumDto> GetAlbumById(int id)
        {
            var album = await _dbContext.Albums
                .Include(al => al.Artist)
                //.Include(al => al.Songs)
                .FirstOrDefaultAsync(a => a.Id == id);
    
            if (album is null)
                throw new NotFoundException("Album not found");

            var albumDto = _mapper.Map<AlbumDto>(album);
            
            return albumDto;
        }

        public async Task<Album> CreateAlbum(CreateAlbumDto dto, int artistId)
        {
            var artist = await GetArtistById(artistId);

            var album = _mapper.Map<Album>(dto);
            album.ArtistId = artistId;
            await _dbContext.Albums.AddAsync(album);
            await _dbContext.SaveChangesAsync();

            return album;
        }



        public async Task<Album> UpdateAlbum(UpdateAlbumDto dto, int id)
        {
            var updatedAlbum = await _dbContext
                .Albums.FirstOrDefaultAsync(a => a.Id == id);

            if (updatedAlbum is null)
                throw new NotFoundException("Album not found");

            updatedAlbum.Title = dto.Title;
            updatedAlbum.Description = dto.Description;
            updatedAlbum.ReleasedYear = dto.ReleasedYear;

            _dbContext.Albums.Update(updatedAlbum);
            await _dbContext.SaveChangesAsync();

            return updatedAlbum;
        }


        public async Task DeleteAlbumById(int id)
        {
            var album = await _dbContext
                .Albums.FirstOrDefaultAsync(a => a.Id == id);

            if (album is null)
                throw new NotFoundException("Album not found");

            _dbContext.Albums.Remove(album);
            await _dbContext.SaveChangesAsync();

        }

        public async Task DeleteAllAlbums(int artistId)
        {
            var artist = await GetArtistById(artistId);

            _dbContext.Albums.RemoveRange(artist.Albums);

            await _dbContext.SaveChangesAsync();

        }

        private async Task<PagedResult<AlbumDto>> GetPagedResultForAlbumQuery(FromQueryOptions queryOptions, IQueryable<Album> albumsQuery)
        {
            var queryHandler = new QueryHandler<Album>(queryOptions);
            var albumQueryApplied = queryHandler.ApplyQueryOptions(albumsQuery);

            var albums = await albumQueryApplied.ToListAsync();
            var albumsDto = _mapper.Map<List<AlbumDto>>(albums);
            var totalItemsCount = queryHandler.SearchPhraseFilteredItems;
            var pagedResult = new PagedResult<AlbumDto>(albumsDto, totalItemsCount, queryOptions.PageSize, queryOptions.PageNumber);
            return pagedResult;
        }


        private async Task<Artist> GetArtistById(int artistId)
        {
            var artist = await _dbContext.
                Artists.
                FirstOrDefaultAsync(a => a.Id == artistId);
            if (artist is null)
                throw new NotFoundException($"Artist not found");

            return artist;
        }

    }
}
