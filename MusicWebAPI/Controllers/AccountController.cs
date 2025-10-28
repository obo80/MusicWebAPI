using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Entities;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser ([FromBody] RegisterUserDto dto)
        {
            var userDto =  await _accountService.RegisterUser(dto);
            return Created($"api/account/{userDto.Id}",userDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            string token = await _accountService.Login(dto);
            return Ok(token);
        }


        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto, [FromHeader] string authorization)
        {
            await _accountService.ChangePassword(dto, authorization);
            return Ok("Password changed successfully.");
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser([FromHeader] string authorization)
        {
            var user = await _accountService.GetCurrentUser(authorization);
            return Ok(user);
        }

        [HttpPut("me")]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] UpdateCurrentUserDto dto, [FromHeader] string authorization)
        {
            var updatedUserDto = await _accountService.UpdateCurrentUser(dto, authorization);
            return Created ($"api/account/me", updatedUserDto);
        }


        [HttpDelete("me")]
        public async Task<IActionResult> DeleteCurrentUser([FromHeader] string authorization)
        {
            await _accountService.DeleteCurrentUser(authorization);
            return NoContent();
        }

    }
}
