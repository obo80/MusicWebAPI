using System.ComponentModel.DataAnnotations;

namespace MusicWebAPI.DTO.UserDto
{
    public class RegisterUserDto
    {
        public string Name { get; set; } //nick of user
        public string Email { get; set; }

        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        //public int RoleId { get; set; } = 1;   //disabled - user cannot grant role greater than 'User' to himself
    }
}
