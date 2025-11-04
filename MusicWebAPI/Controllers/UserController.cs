using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;
using MusicWebAPI.Utils.GetFromQueryOptions;

namespace MusicWebAPI.Controllers
{
    [Route("api/user")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] FromQueryOptions queryOptions)
        {
            var usersDto = await _userService.GetAllUsers(queryOptions);
            return Ok(usersDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var userDto  = await _userService.GetUserById(id);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto dto)
        {
            var updatedUserDto = await _userService.UpdateUserById(id, dto);
            return Created("",updatedUserDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserById(id);
            return NoContent();
        }
    }
}
