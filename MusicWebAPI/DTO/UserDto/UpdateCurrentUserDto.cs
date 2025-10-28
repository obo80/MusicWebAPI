namespace MusicWebAPI.DTO.UserDto
{
    public class UpdateCurrentUserDto
    {
        public string? Name { get; set; } //nick of user
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
    }
}
