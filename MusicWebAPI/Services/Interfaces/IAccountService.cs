using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAccountService
    {
        Task<string> GenerateJWT(LoginDto dto);
        Task RegisterUser(RegisterUserDto dto);
    }
}