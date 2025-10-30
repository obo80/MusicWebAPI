using MusicWebAPI.DTO;
using MusicWebAPI.Entities;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAlbumService
    {
        Task<IEnumerable<AlbumDto>> GetAllAlbums(string searchPhrase);
        Task<IEnumerable<AlbumDto>> GetAllAlbums(int artistId, string searchPhrase);
        Task<AlbumDto> GetAlbumById(int id);
        Task<Album> CreateAlbum(CreateAlbumDto dto, int artistId);
        Task<Album> UpdateAlbum(UpdateAlbumDto dto, int id);
        Task DeleteAlbumById(int id);
        Task DeleteAllAlbums(int artistId);
    }
}