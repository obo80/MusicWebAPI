using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Exceptions;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Services
{
    public class SongService :ISongService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;

        public SongService(MusicWebDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SongDto>> GetAllSongs()
        {
            var songs = await _dbContext.Songs
                .Include(s => s.Artist)
                .ToListAsync();
            var songsDto = _mapper.Map<List<SongDto>>(songs);

            return songsDto;
        }

        public async Task<IEnumerable<SongDto>> GetAllSongs(int artistId)
        {
            var songs =  await _dbContext.Songs
                .Include(s => s.Artist)
                .Where(s => s.ArtistId == artistId)
                .ToListAsync();
            var songsDto = _mapper.Map<List<SongDto>>(songs);

            return songsDto;
        }

        public async Task<SongDto> GetSongById(int id)
        {
            var song = await _dbContext.Songs
                .FindAsync(id);
            if (song is null)
                throw new Exception("Song not found");

            var songDto = _mapper.Map<SongDto>(song);
            return songDto;
        }

        public async Task<Song> CreateSong(CreateSongDto dto, int artistId)
        {
            var artist = await GetArtistById(artistId);
            var song = _mapper.Map<Song>(dto);
            song.ArtistId = artistId;

            UpdateAlbumId(dto.AlbumId, artist, song);

            await _dbContext.Songs.AddAsync(song);
            await _dbContext.SaveChangesAsync();
            return song;
        }

        public async Task<Song> UpdateSong(UpdateSongDto dto, int id)
        {

            var updatedSong = await _dbContext.Songs.FirstOrDefaultAsync(s => s.Id == id);

            if (updatedSong is null)
                throw new NotFoundExceptions("Song not found");

            updatedSong.Title = dto.Title;
            updatedSong.Description = dto.Description;
            updatedSong.Lenght = dto.Lenght;
            updatedSong.ReleasedYear = dto.ReleasedYear;

            var artist = await GetArtistById(updatedSong.ArtistId);
            UpdateAlbumId(dto.AlbumId, updatedSong.Artist, updatedSong);

            _dbContext.Songs.Update(updatedSong);
            await _dbContext.SaveChangesAsync();

            return updatedSong;
        }

        private void UpdateAlbumId(int? dtoSongAlbumId, Artist artist, Song song)
        {
            if (dtoSongAlbumId.HasValue)
            {
                var album = artist.Albums.FirstOrDefault(al => al.Id == dtoSongAlbumId.Value);
                if (album is null)
                    throw new NotFoundExceptions("Album not found for this artist");

                song.AlbumId = dtoSongAlbumId;
            }
        }

        public async Task DeleteAllAlbumSongs(int albumId)
        {
            var album = await GetAlbumById(albumId);

            _dbContext.Songs.RemoveRange(album.Songs);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAllArtistSongs(int artistId)
        {
            var artist = await GetArtistById(artistId);

            _dbContext.RemoveRange(artist.Songs);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteSongById(int id)
        {
            var song = await _dbContext.Songs.FirstOrDefaultAsync(s => s.Id==id);

            if (song is null)
                throw new NotFoundExceptions("Song not found");

            _dbContext.Songs.Remove(song);
            await _dbContext.SaveChangesAsync();
        }


        private async Task<Artist> GetArtistById(int artistId)
        {
            var artist = await _dbContext.Artists
                .Include(ar => ar.Albums)
                .Include(ar => ar.Songs)
                .FirstOrDefaultAsync(a => a.Id == artistId);
            if (artist is null)
                throw new NotFoundExceptions($"Artist not found");

            return artist;
        }

        private async Task<Album> GetAlbumById(int albumId)
        {
            var album = await _dbContext.Albums
                .Include(a => a.Artist)
                .Include(a => a.Songs)
                .FirstOrDefaultAsync(a => a.Id == albumId);

            if (album is null)
                throw new NotFoundExceptions($"Album not found");

            return album;
        }


    }
}
