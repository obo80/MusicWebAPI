using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;
using MusicWebAPI.Utils.GetFromQueryOptions;

namespace MusicWebAPI.Controllers
{
    [Route("api/Album")]

    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        private readonly ISongService _songService;

        public AlbumController(IAlbumService albumService, ISongService songService)
        {
            _albumService = albumService;
            _songService = songService;
        }

        // GET: api/Album
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums([FromQuery] FromQueryOptions queryOptions)
        {
            var albumDto = await _albumService.GetAllAlbums(queryOptions);
            return Ok(albumDto);
        }

        // GET: api/Album/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumDto>> GetAlbum([FromRoute] int id)
        {
            var albumDto = await _albumService.GetAlbumById(id);

            return Ok(albumDto);
        }

        // GET: api/Album/5/songs
        [HttpGet("{id}/songs")]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongsForAlbum([FromRoute] int id, [FromQuery] FromQueryOptions queryOptions)
        {
            var songsDTO = await _songService.GetAllAlbumSongs(id, queryOptions);

            return Ok(songsDTO);
        }

    }
}
