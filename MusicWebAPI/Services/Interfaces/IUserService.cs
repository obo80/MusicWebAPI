using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Utils.GetFromQueryOptions;

namespace MusicWebAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<PagedResult<UserDto>> GetAllUsers(FromQueryOptions queryOptions);
        Task<UserDto> GetUserById(int id);
        Task DeleteUserById(int id);
        Task<UserDto> UpdateUserById(int id, UpdateUserDto dto);
    }
}
