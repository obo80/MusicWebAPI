using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicWebAPI.Controllers
{
    [Route("api/Artist/{artistId}/Album/{albumId}/Rating")]
    [ApiController]
    [Authorize(Roles = "User,Creator")]
    public class AlbumRatingController : ControllerBase
    {
        private readonly IAlbumRatingService _albumRatingService;

        public AlbumRatingController(IAlbumRatingService albumRatingService)
        {
            _albumRatingService = albumRatingService;
        }

        // GET: api/Artist/{artistId}/Album/{albumId}/Rating
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingDto>>> GetAlbumtRatings(int albumId)
        {
            var ratingsDto = await _albumRatingService.GetAlbumRatings(albumId);
            return Ok(ratingsDto);
        }
        // GET: api/Artist/{artistId}/Album/{albumId}/Rating
        [HttpGet("my")]
        public async Task<ActionResult<RatingDto>> GetMyAlbumRatings(int albumId, [FromHeader] string authorization)
        {
            var ratingDto = await _albumRatingService.GetMyAlbumRatings(albumId, authorization);
            return Ok(ratingDto);
        }


        // GET api/Artist/{artistId}/Album/{albumId}/Rating
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<RatingDto>> GetAlbumRating([FromRoute] int id)
        {
            var ratingDto = await _albumRatingService.GetAlbumRatingById(id);
            return Ok(ratingDto);
        }

        // POST api/Artist/{artistId}/Album/{albumId}/Rating
        [HttpPost]
        public async Task<ActionResult<ArtistRating>> PostAlbumRating([FromBody] RatingDto ratingDto, [FromRoute] int albumId, [FromHeader] string authorization)
        {
            var createdRating = await _albumRatingService.CreateAlbumRating(ratingDto, albumId, authorization);
            return Created("", createdRating);
        }

        // PUT api/Artist/{artistId}/Album/{albumId}/Rating/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArtistRating>> PutAlbumRating([FromBody] RatingDto ratingDto, [FromRoute] int id, [FromHeader] string authorization)
        {
            var updatedRating = await _albumRatingService.UpdateAlbumRatingById(ratingDto, id, authorization);
            return Ok();
        }

        // DELETE api/Artist/{artistId}/Album/{albumId}/Rating/my
        [HttpDelete("my")]
        public async Task<IActionResult> DeleteMyAlbumRating([FromRoute] int albumId, [FromHeader] string authorization)
        {
            await _albumRatingService.DeleteMyAlbumRatings(albumId, authorization);
            return NoContent();
        }


        // DELETE api/Artist/{artistId}/Album/{albumId}/Rating/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbumRating([FromRoute] int id)
        {
            await _albumRatingService.DeleteAlbumRatingById(id);
            return NoContent();
        }

        // DELETE api/Artist/{artistId}/Album/{albumId}/Rating/
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAlbumRatings([FromRoute] int albumId)
        {
            await _albumRatingService.DeleteAllAlbumRatings(albumId);
            return NoContent();
        }
    }
}
