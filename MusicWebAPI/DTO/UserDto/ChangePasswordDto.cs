namespace MusicWebAPI.DTO.UserDto
{
    public record ChangePasswordDto
    {
        public required string Password { get; set; }

        public required string NewPassword { get; set; }
        public required string ConfirmPassword { get; set; }
    }
}