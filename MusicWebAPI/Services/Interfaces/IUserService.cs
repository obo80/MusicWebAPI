using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsers();
        Task<UserDto> GetUserById(int id);
        Task DeleteUserById(int id);
        Task<UserDto> UpdateUserById(int id, UpdateUserDto dto);
    }
}
