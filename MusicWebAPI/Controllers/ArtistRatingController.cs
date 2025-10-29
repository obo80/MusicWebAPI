using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities.Rating;
using MusicWebAPI.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicWebAPI.Controllers
{
    [Route("api/Artist/{artistId}/Rating")]
    [ApiController]
    [Authorize(Roles = "User,Creator")]
    public class ArtistRatingController : ControllerBase
    {
        private readonly IArtistRatingService _artistRatingService;

        public ArtistRatingController(IArtistRatingService artistRatingService)
        {
            _artistRatingService = artistRatingService;
        }


        // GET: api/Artist/{artistId}/Rating
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingDto>>> GetArtistRatings(int artistId)
        {
            var ratingsDto = await _artistRatingService.GetArtistRatings(artistId);
            return Ok(ratingsDto);
        }
        // GET: api/Artist/{artistId}/Rating/my
        [HttpGet("my")]
        public async Task<ActionResult<RatingDto>> GetMyArtistRatings(int artistId, [FromHeader] string authorization)
        {
            var ratingDto = await _artistRatingService.GetMyArtistRatings(artistId, authorization);
            return Ok(ratingDto);
        }


        // GET api/Artist/{artistId}/Rating/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<RatingDto>> GetArtistRating([FromRoute] int id)
        {
            var ratingDto = await _artistRatingService.GetArtistRatingById(id);
            return Ok(ratingDto);
        }

        // POST api/Artist/{artistId}/Rating
        [HttpPost]
        public async Task<ActionResult<ArtistRating>> PostArtistRating([FromBody] RatingDto ratingDto, [FromRoute] int artistId, [FromHeader] string authorization)
        {
            var createdRating = await _artistRatingService.CreateArtistRating(ratingDto, artistId, authorization);
            return Created($"api/Artist/{artistId}/Rating/{createdRating.Id}", createdRating);
        }

        // PUT api/Artist/{artistId}/Rating/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArtistRating>> PutArtistRating([FromBody] RatingDto ratingDto, [FromRoute] int id, [FromHeader] string authorization)
        {
            var updatedRating = await _artistRatingService.UpdateArtistRatingById(ratingDto, id, authorization);
            return Ok();
        }

        
        [HttpDelete("my")]
        public async Task<IActionResult> DeleteMyArtistRating([FromRoute] int artistId, [FromHeader] string authorization)
        {
            await _artistRatingService.DeleteMyArtistRatings(artistId, authorization);
            return NoContent();
        }


        // DELETE api/Artist/{artistId}/Rating/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtistRating([FromRoute] int id)
        {
            await _artistRatingService.DeleteArtistRatingById(id);
            return NoContent();
        }

        // DELETE api/Artist/{artistId}/Rating/
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteArtistRatings([FromRoute] int artistId)
        {
            await _artistRatingService.DeleteAllArtistRatings(artistId);
            return NoContent();
        }
    }
}
