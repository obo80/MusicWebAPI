namespace MusicWebAPI.DTO.UserDto
{
    public record UserDto
    {
        public int Id { get; set; }
        public required string Name { get; set; } //nick of user
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Email { get; set; }
        public int RoleId { get; set; } 
        public string? RoleName { get; set; }
    }
}