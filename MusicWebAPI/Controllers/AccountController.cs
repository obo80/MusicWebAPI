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
            await _accountService.RegisterUser(dto);
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            string token = await _accountService.Login(dto);
            return Ok(token);
        }

        [HttpPost ("logout")]
        public async Task<IActionResult> Logout()
        {
            await _accountService.Logout();
            return Ok("User logged out successfully.");
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            await _accountService.ChangePassword(dto);
            return Ok("Password changed successfully.");
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _accountService.GetCurrentUser();
            return Ok(user);
        }

        [HttpPut("me")]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] UpdateUserDto dto)
        {
            var updatedUser = await _accountService.UpdateCurrentUser(dto);
            return Ok("User updated successfully.");
        }


        [HttpDelete("me")]
        public async Task<IActionResult> DeleteCurrentUser()
        {
            await _accountService.DeleteCurrentUser();
            return Ok("Current user deleted successfully.");
        }

    }
}
