using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAccountService
    {
        Task<UserDto> RegisterUser(RegisterUserDto dto);
        Task<string> Login(LoginDto dto);
        Task<UserDto> GetCurrentUser(string authorization);
        Task<UserDto> UpdateCurrentUser(UpdateCurrentUserDto dto, string authorization);
        Task DeleteCurrentUser(string authorization);
        Task ChangePassword(ChangePasswordDto dto, string authorization);
    }
}