using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
using MusicWebAPI.Entities.User;

namespace MusicWebAPI.Data
{
    public class MusicWebDbContext :DbContext
    {
        public MusicWebDbContext(DbContextOptions <MusicWebDbContext> options) :base(options)
        {
            
        }

        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<Genre> Genres { get; set; }

        public DbSet<ArtistRating> ArtistRatings { get; set; }
        public DbSet<AlbumRating> AlbumRatings { get; set; }
        public DbSet<SongRating> SongRatings { get; set; }

        public DbSet<User> Users { get; set; } 
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(eb =>
            {
                eb.Property(u => u.Name).IsRequired();
                eb.Property(u => u.Email).IsRequired();
                //eb.Property(u => u.PasswordHash).IsRequired();
                //eb.HasOne(u => u.Role)
                //.WithMany()
                //.HasForeignKey(u => u.RoleId);
            });

            modelBuilder.Entity<Role>(eb =>
            {
                eb.Property(r => r.Name).IsRequired();
            });


            modelBuilder.Entity<Artist>(eb =>
            {
                eb.Property(ar => ar.Name).IsRequired();

                //eb.HasIndex(ar => ar.Name).IsUnique();

                eb.HasMany(ar => ar.Albums)
                .WithOne(al => al.Artist)
                .HasForeignKey(al => al.ArtistId);

                eb.HasMany(ar => ar.Songs)
                .WithOne(s => s.Artist)
                .HasForeignKey(s => s.ArtistId).
                OnDelete(DeleteBehavior.ClientCascade);

                eb.HasMany(ar => ar.Ratings)
                .WithOne(r => r.Artist)
                .HasForeignKey(r => r.ArtistId);
            });

            modelBuilder.Entity<Album>(eb =>
            {
                eb.Property(al => al.Title).IsRequired();
                eb.Property(al => al.ArtistId).IsRequired();

                eb.HasMany(al => al.Songs)
                .WithOne(s => s.Album)
                .HasForeignKey(s => s.AlbumId)
                .OnDelete(DeleteBehavior.NoAction);

                eb.HasOne(al => al.Genres);

                eb.HasMany(al => al.Ratings)
                .WithOne(r => r.Album)
                .HasForeignKey(r => r.AlbumId);
            });


            modelBuilder.Entity<Song>(eb =>
            {
                eb.Property(s => s.Title).IsRequired();
                eb.Property(s => s.ArtistId).IsRequired();

                eb.HasMany(s => s.Ratings)
                .WithOne(r => r.Song)
                .HasForeignKey(r => r.SongId);

            });

            modelBuilder.Entity<ArtistRating>(eb =>
            {
                eb.Property(r => r.CreateUserId).IsRequired();
                eb.Property(r => r.Value).IsRequired();
                eb.Property(r => r.ArtistId).IsRequired();
            });

            modelBuilder.Entity<AlbumRating>(eb =>
            {
                eb.Property(r => r.CreateUserId).IsRequired();
                eb.Property(r => r.Value).IsRequired();
                eb.Property(r => r.AlbumId).IsRequired();
            });

            modelBuilder.Entity<SongRating>(eb =>
            {
                eb.Property(r => r.CreateUserId).IsRequired();
                eb.Property(r => r.Value).IsRequired();
                eb.Property(r => r.SongId).IsRequired();
            });


        }
    }
}
