using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IArtistService
    {
        //Task<int> CreateArtist(CreateArtistDto createArtistDto);
        //Task<ActionResult<Artist>> CreateArtist(CreateArtistDto createArtistDto);
 
        Task<IEnumerable<ArtistDto>> GetAllArtists();
        Task<ArtistDto> GetArtistsById(int id);
        Task<Artist> CreateArtist(CreateArtistDto createArtistDto);
        void UpdateArtist(UpdateArtist dto, int id);
        void DeleteArtist(int id);
    }
}