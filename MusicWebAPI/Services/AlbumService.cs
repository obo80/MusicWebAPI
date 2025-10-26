using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Exceptions;
using MusicWebAPI.Services.Interfaces;

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


        public async Task<IEnumerable<AlbumDto>> GetAllAlbums()
        {
            var albums = await _dbContext.Albums.ToListAsync();
            var albumsDto = _mapper.Map<List<AlbumDto>>(albums);

            return albumsDto;
        }
        public async Task<IEnumerable<AlbumDto>> GetAllAlbums(int artistId)
        {
            var artist = await GetArtistById(artistId);
   
            var albums = await _dbContext.Albums.
                Where(al => al.ArtistId == artistId)
                .ToListAsync();
            var albumsDto = _mapper.Map<List<AlbumDto>>(albums);

            return albumsDto;
        }


        public async Task<AlbumDto> GetAlbumById(int id)
        {
            var album = await _dbContext.Albums.FindAsync(id);
            if (album is null)
                throw new NotFoundExceptions("Album not found");

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
            var album = await _dbContext
                .Albums.FirstOrDefaultAsync(a => a.Id == id);

            if (album is null)
                throw new NotFoundExceptions("Album not found");

            album.Title = dto.Title;
            album.Description = dto.Description;
            album.ReleasedYear = dto.ReleasedYear;

            _dbContext.Albums.Update(album);
            await _dbContext.SaveChangesAsync();

            return album;
        }


        public async Task DeleteAlbumById(int id)
        {
            var album = await _dbContext
                .Albums.FirstOrDefaultAsync(a => a.Id == id);

            if (album is null)
                throw new NotFoundExceptions("Album not found");

            _dbContext.Albums.Remove(album);
            await _dbContext.SaveChangesAsync();

        }

        public async Task DeleteAllAlbums(int artistId)
        {
            var artist = await GetArtistById(artistId);

            _dbContext.Albums.RemoveRange(artist.Albums);

            await _dbContext.SaveChangesAsync();

        }


        private async Task<Artist> GetArtistById(int artistId)
        {
            var artist = await _dbContext.
                Artists.
                FirstOrDefaultAsync(a => a.Id == artistId);
            if (artist is null)
                throw new NotFoundExceptions($"Artist not found");

            return artist;
        }

    }
}
