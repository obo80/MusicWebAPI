using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Controllers
{
    [Route("api/Album")]

    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        // GET: api/Album
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums()
        {
            var albumDto = await _albumService.GetAllAlbums();
            return Ok(albumDto);
        }

        // GET: api/Album/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum([FromRoute] int id)
        {
            var albumDto = await _albumService.GetAlbumById(id);

            return Ok(albumDto);
        }


    }
}
