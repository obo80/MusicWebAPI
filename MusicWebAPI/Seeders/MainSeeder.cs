using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.User;
using System.Data;

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
                UpdateDatabaseForPendingMigrations();

                if (!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                }
                if (!_dbContext.Genres.Any())
                {
                    var genres = GetGengers();
                    _dbContext.Genres.AddRange(genres);
                    _dbContext.SaveChanges();
                }

            }
        }

        private void UpdateDatabaseForPendingMigrations()
        {
            var pendingMigrations = _dbContext.Database.GetPendingMigrations();
            if (pendingMigrations != null && pendingMigrations.Any())
            {
                _dbContext.Database.Migrate();
            }
        }

        private IEnumerable<Genre> GetGengers()
        {
            var genres = new List<Genre>()
            {
                new Genre() {Name = "Rock"},
                new Genre() {Name = "Metal"},
                new Genre() {Name = "Pop"},
                new Genre() {Name = "Disco"},
                new Genre() {Name = "Classic"},
                new Genre() {Name = "Other"}
            };

            return genres;
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
