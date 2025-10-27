using MusicWebAPI.Data;
using MusicWebAPI.Entities.User;

namespace MusicWebAPI.Seeders
{
    public class MainSeeder
    {
        private readonly MusicWebDbContext _dbContext;

        public MainSeeder(MusicWebDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                } 
            }
        }



        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name = "User"           //standard user role - can rate, comment and view content
                },
                new Role()
                {
                Name = "Creator"            //content creator role - can add new, edit and delete their own items
            },
                new Role()
                {
                    Name = "Admin"          //admin role - can manage all items and users
                },
            };

            return roles;
        }
    }
}
