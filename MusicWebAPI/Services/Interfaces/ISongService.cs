using MusicWebAPI.DTO;
using MusicWebAPI.Entities;

namespace MusicWebAPI.Services.Interfaces
{
    public interface ISongService
    {
        Task<IEnumerable<SongDto>> GetAllSongs(string searchPhrase);
        Task<IEnumerable<SongDto>> GetAllSongs(int artistId, string searchPhrase);
        Task<SongDto> GetSongById(int id);
        Task<Song> CreateSong(CreateSongDto dto, int artistId);
        Task<Song> UpdateSong(UpdateSongDto dto, int id);
        Task DeleteSongById(int id);
        Task DeleteAllAlbumSongs(int albumId);
        Task DeleteAllArtistSongs(int artistId);
    }
}