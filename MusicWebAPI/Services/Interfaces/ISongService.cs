using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Utils.GetFromQueryOptions;

namespace MusicWebAPI.Services.Interfaces
{
    public interface ISongService
    {
        Task<PagedResult<SongDto>> GetAllSongs(FromQueryOptions queryOptions);
        Task<PagedResult<SongDto>> GetAllSongs(int artistId, FromQueryOptions queryOptions);
        Task<SongDto> GetSongById(int id);
        Task<Song> CreateSong(CreateSongDto dto, int artistId);
        Task<Song> UpdateSong(UpdateSongDto dto, int id);
        Task DeleteSongById(int id);
        Task DeleteAllAlbumSongs(int albumId);
        Task DeleteAllArtistSongs(int artistId);
    }
}