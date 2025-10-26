using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Controllers
{
    [Route("api/Artist")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly IArtistService _artistService;


        public ArtistController(IArtistService artistService)
        {
            _artistService = artistService;
        }

        // GET: api/Artists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtistDto>>> GetArtists()
        {
            var artistsDto = await _artistService.GetAllArtists();

            return Ok(artistsDto);
            //return await _dbContext.Artists.ToListAsync();
        }

        //GET: api/Artists/5
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
            //await Task.Run(() => _artistService.UpdateArtist(updateArtistDto, id));

            
            return Ok(artist);
        }



        // DELETE: api/Artists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist(int id)
        {
            await _artistService.DeleteArtistById(id);

            //await Task.Run(() => _artistService.DeleteArtist(id));

            return NoContent();
        }




    }
}
