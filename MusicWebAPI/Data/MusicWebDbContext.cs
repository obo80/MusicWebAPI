using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Entities;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

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
            });


            modelBuilder.Entity<Song>(eb =>
            {
                eb.Property(s => s.Title).IsRequired();
                eb.Property(s => s.ArtistId).IsRequired();

            });


        }
    }
}
