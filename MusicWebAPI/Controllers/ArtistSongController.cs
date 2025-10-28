using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicWebAPI.Controllers
{
    [Route("api/Artist/{artistId}/Song")]
    [ApiController]
    public class ArtistSongController : ControllerBase
    {
        private readonly ISongService _songService;

        public ArtistSongController(ISongService songService)
        {
            _songService = songService;
        }

        // GET: api/Artist/{artistId}/Song
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongs(int artistId)
        {
            var songsDto = await _songService.GetAllSongs(artistId);
            return Ok(songsDto);
        }

        // GET: api/Artist/{artistId}/Song/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong([FromRoute] int id)
        {
            var songDto = await _songService.GetSongById(id);
            return Ok(songDto); 

        }

        // POST: api/Artist/{artistId}/Song
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Song>> PostSong([FromBody] CreateSongDto createSongDto, [FromRoute] int artistId)
        {
            var newSong = await _songService.CreateSong(createSongDto, artistId);

            return Created($"api/Artist/{artistId}/Song/{newSong.Id}", newSong);
        }

        // PUT: api/Artist/{artistId}/Song/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSong([FromRoute] int id, [FromBody] UpdateSongDto updateSongDto)
        {
            var updatedSong = await _songService.UpdateSong(updateSongDto, id);
            return Ok(updatedSong);

        }

        // DELETE: api/Artist/{artistId}/Song/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            await _songService.DeleteSongById(id);
            return NoContent();
        }

        // DELETE: api/Artist/{artistId}/Song
        [HttpDelete]
        public async Task<IActionResult> DeleteAllAlbums([FromRoute] int artistId)
        {
            await _songService.DeleteAllArtistSongs(artistId);
            return NoContent();
        }
    }
}
