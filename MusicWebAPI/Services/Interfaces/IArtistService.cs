using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.DTO.GetFromQueryOptions;
using MusicWebAPI.DTO.GetQuery;
using MusicWebAPI.Entities;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IArtistService
    {
        //Task<int> CreateArtist(CreateArtistDto createArtistDto);
        //Task<ActionResult<Artist>> CreateArtist(CreateArtistDto createArtistDto);
 
        Task<PagedResult<ArtistDto>> GetAllArtists(FromQueryOptions queryOptions);
        Task<ArtistDto> GetArtistsById(int id);
        Task<Artist> CreateArtist(CreateArtistDto createArtistDto);
        Task<Artist> UpdateArtist(UpdateArtistDto dto, int id);
        Task DeleteArtistById(int id);
    }
}