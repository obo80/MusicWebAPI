using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicWebAPI.Controllers
{
    [Route("api/Artist/{artistId}/Song/{songId}/Rating")]
    [ApiController]
    [Authorize(Roles = "User,Creator")]
    public class SongRatingController : ControllerBase
    {   
        private readonly ISongRatingService _songRatingService;
        public SongRatingController(ISongRatingService songRatingService)
        {
            _songRatingService = songRatingService;
        }

        // GET: api/Artist/{artistId}/Song/{songId}/Rating
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingDto>>> GetSongtRatings(int songId)
        {
            var ratingsDto = await _songRatingService.GetSongRatings(songId);
            return Ok(ratingsDto);
        }
        // GET: api/Artist/{artistId}/Song/{songId}/Rating
        [HttpGet("my")]
        public async Task<ActionResult<RatingDto>> GetMySongRatings(int songId, [FromHeader] string authorization)
        {
            var ratingDto = await _songRatingService.GetMySongRatings(songId, authorization);
            return Ok(ratingDto);
        }


        // GET api/Artist/{artistId}/Song/{songId}/Rating
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<RatingDto>> GetSongRating([FromRoute] int id)
        {
            var ratingDto = await _songRatingService.GetSongRatingById(id);
            return Ok(ratingDto);
        }

        // POST api/Artist/{artistId}/Song/{songId}/Rating
        [HttpPost]
        public async Task<ActionResult<ArtistRating>> PostSongRating([FromBody] RatingDto ratingDto, [FromRoute] int songId, [FromHeader] string authorization)
        {
            var createdRating = await _songRatingService.CreateSongRating(ratingDto, songId, authorization);
            return Created("", createdRating);
        }

        // PUT api/Artist/{artistId}/Song/{songId}/Rating/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArtistRating>> PutSongRating([FromBody] RatingDto ratingDto, [FromRoute] int id, [FromHeader] string authorization)
        {
            var updatedRating = await _songRatingService.UpdateSongRatingById(ratingDto, id, authorization);
            return Ok();
        }

        // DELETE api/Artist/{artistId}/Song/{songId}/Rating/my
        [HttpDelete("my")]
        public async Task<IActionResult> DeleteMySongRating([FromRoute] int songId, [FromHeader] string authorization)
        {
            await _songRatingService.DeleteMySongRatings(songId, authorization);
            return NoContent();
        }


        // DELETE api/Artist/{artistId}/Song/{songId}/Rating/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSongRating([FromRoute] int id)
        {
            await _songRatingService.DeleteSongRatingById(id);
            return NoContent();
        }

        // DELETE api/Artist/{artistId}/Song/{songId}/Rating/
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSongRatings([FromRoute] int songId)
        {
            await _songRatingService.DeleteAllSongRatings(songId);
            return NoContent();
        }
    }
}
