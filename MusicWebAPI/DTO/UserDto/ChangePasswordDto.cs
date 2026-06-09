namespace MusicWebAPI.DTO.UserDto
{
    public record ChangePasswordDto
    {
        public string Password { get; set; }

        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}