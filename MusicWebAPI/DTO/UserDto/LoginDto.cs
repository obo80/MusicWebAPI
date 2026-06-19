namespace MusicWebAPI.DTO.UserDto
{
    public record LoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}