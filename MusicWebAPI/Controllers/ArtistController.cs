using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Services.Interfaces;
using MusicWebAPI.Utils.GetFromQueryOptions;

namespace MusicWebAPI.Controllers
{
    [Route("api/Artist")]
    [Authorize(Roles = "Creator")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly IArtistService _artistService;


        public ArtistController(IArtistService artistService)
        {
            _artistService = artistService;
        }

        // GET: api/Artists
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtistDto>>> GetArtists([FromQuery] FromQueryOptions queryOptions)
        {
            var artistsDto = await _artistService.GetAllArtists(queryOptions);

            return Ok(artistsDto);
        }


        //GET: api/Artists/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> GetArtist([FromRoute]int id)
        {
            var artistDto = await _artistService.GetArtistsById(id);

            return Ok(artistDto);
        }


        // POST: api/Artists
        [HttpPost]
        public async Task<ActionResult<Artist>> PostArtist([FromBody] CreateArtistDto createArtistDto)
        {
            var artist = await _artistService.CreateArtist(createArtistDto);

            //return created Artist
            return CreatedAtAction("GetArtist", new { id = artist.Id }, artist);
        }

        // PUT: api/Artists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtist([FromRoute] int id, [FromBody] UpdateArtistDto updateArtistDto)
        {
            var artist = await _artistService.UpdateArtist(updateArtistDto, id);
            return Ok(artist);
        }

        // DELETE: api/Artists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist(int id)
        {
            await _artistService.DeleteArtistById(id);
            return NoContent();
        }




    }
}
