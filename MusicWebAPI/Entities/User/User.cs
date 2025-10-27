using System.Data;

namespace MusicWebAPI.Entities.User
{
    public class User
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string Name { get; set; } //nick of user
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string PasswordHash { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
