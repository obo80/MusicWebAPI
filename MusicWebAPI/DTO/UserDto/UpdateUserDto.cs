using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO.UserDto
{
    public record UpdateUserDto
    {
        public string? Name { get; set; } //nick of user
        public string? Email { get; set; }
        public int? RoleId { get; set; }

    }
}