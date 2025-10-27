using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IAccountService
    {
        Task RegisterUser(RegisterUserDto dto);
        Task<string> Login(LoginDto dto);
        Task<UserDto> GetCurrentUser();
        Task<UserDto> UpdateCurrentUser(UpdateUserDto dto);
        Task DeleteCurrentUser();
        Task Logout();
        Task ChangePassword(ChangePasswordDto dto);
    }
}