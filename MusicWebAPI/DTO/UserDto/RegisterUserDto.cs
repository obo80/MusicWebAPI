using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO.UserDto
{
    public record RegisterUserDto
    {
        public required string Name { get; set; } //nick of user
        public required string Email { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public required string Password { get; set; }
        public required string ConfirmPassword { get; set; }

        //public int RoleId { get; set; } = 1;   //disabled - user cannot grant role greater than 'User' to himself
    }
}
