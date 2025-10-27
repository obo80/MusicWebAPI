namespace MusicWebAPI.DTO.UserDto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } //nick of user
        public string Email { get; set; }
        public int RoleId { get; set; } 
        public string RoleName { get; set; }
    }
}