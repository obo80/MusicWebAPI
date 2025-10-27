namespace MusicWebAPI.DTO.UserDto
{
    public class ChangePasswordDto
    {
        public string Name { get; set; } //nick of user
        public string Email { get; set; }

        public string Password { get; set; }

        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}