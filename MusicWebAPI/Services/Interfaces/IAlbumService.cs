using MusicWebAPI.DTO;
using MusicWebAPI.DTO.GetFromQueryOptions;
using MusicWebAPI.DTO.GetQuery;
using MusicWebAPI.Entities;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAlbumService
    {
        Task<PagedResult<AlbumDto>> GetAllAlbums(FromQueryOptions queryOptions);
        Task<PagedResult<AlbumDto>> GetAllAlbums(int artistId, FromQueryOptions queryOptions);
        Task<AlbumDto> GetAlbumById(int id);
        Task<Album> CreateAlbum(CreateAlbumDto dto, int artistId);
        Task<Album> UpdateAlbum(UpdateAlbumDto dto, int id);
        Task DeleteAlbumById(int id);
        Task DeleteAllAlbums(int artistId);
    }
}