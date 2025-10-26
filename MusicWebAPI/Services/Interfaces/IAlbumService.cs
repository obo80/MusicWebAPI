using MusicWebAPI.DTO;
using MusicWebAPI.Entities;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAlbumService
    {
        Task<IEnumerable<AlbumDto>> GetAllAlbums();
        Task<IEnumerable<DTO.AlbumDto>> GetAllAlbums(int artistId);
        Task<AlbumDto> GetAlbumById(int id);
        Task<Album> CreateAlbum(DTO.CreateAlbumDto dto, int artistId);
        Task<Album> UpdateAlbum(UpdateAlbumDto dto, int id);
        Task DeleteAlbumById(int id);
        Task DeleteAllAlbums(int id);
    }
}