using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Controllers
{

    [Route("api/Song")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly ISongService _songService;
        public SongController(ISongService songService)
        {
            _songService = songService;
        }
        // GET: api/Song
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongDto>>> GetSongs()
        {
            var songDto = await _songService.GetAllSongs();
            return Ok(songDto);
        }
        // GET: api/Song/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong([FromRoute] int id)
        {
            var songDto = await _songService.GetSongById(id);
            return Ok(songDto);
        }
    }
}

