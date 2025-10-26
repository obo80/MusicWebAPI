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
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace MusicWebAPI.Controllers
{
    [Route("api/Artist/{artistId}/Album")]
    [ApiController]
    public class ArtistAlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;

        public ArtistAlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        // GET: api/Artist/{artistId}/Album
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums(int artistId)
        {
            var albumsDto = await _albumService.GetAllAlbums(artistId);
            return Ok(albumsDto);
            //return Ok(new List<AlbumDto>());
        }

        // GET: api/Artist/{artistId}/Album/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum([FromRoute] int id)
        {
            var albumDto = await _albumService.GetAlbumById(id);

            return Ok(albumDto);
        }

        // POST: api/Artist/{artistId}/Album
        [HttpPost]
        public async Task<ActionResult<Album>> PostAlbum([FromBody] CreateAlbumDto createAlbumDto, [FromRoute] int artistId)
        {
            var newAlbum = await _albumService.CreateAlbum(createAlbumDto, artistId);

            return Created($"api/Artist/{artistId}/Album/{newAlbum.Id}", newAlbum);
 
        }

        // PUT: api/Artist/{artistId}/Album/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum([FromRoute] int id,[FromBody] UpdateAlbumDto updateAlbumDto)
        {
            var updatedAlbum = await _albumService.UpdateAlbum(updateAlbumDto, id);
            //await Task.Run(() => _albumService.UpdateAlbum(updateAlbumDto, id));

            return Ok(updatedAlbum);
        }



        // DELETE: api/Artist/{artistId}/Album/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum([FromRoute] int id)
        {
            await _albumService.DeleteAlbumById(id);
            //await Task.Run(() => _albumService.DeleteAlbumById(id));

            return NoContent();
        }

        // DELETE: api/Artist/{artistId}/Album
        [HttpDelete]
        public async Task<IActionResult> DeleteAllAlbums([FromRoute] int artistId)
        {
            await _albumService.DeleteAllAlbums(artistId);
            //await Task.Run(() => _albumService.DeleteAllAlbums(artistId));

            return NoContent();
        }




    }
}
