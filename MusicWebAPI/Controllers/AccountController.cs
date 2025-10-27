using Microsoft.AspNetCore.Mvc;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Entities;
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
            string token = await _accountService.GenerateJWT(dto);
            return Ok(token);
        }



    }
}
