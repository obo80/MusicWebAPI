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
            //modelBuilder.Entity<Artist>()
            //    .HasMany(ar => ar.Albums)
            //    .WithOne(al => al.Artist)
            //    .HasForeignKey(al => al.ArtistId);

            //modelBuilder.Entity<Artist>()
            //    .HasMany(ar => ar.Songs)
            //    .WithOne(s => s.Artist)
            //    .HasForeignKey(s => s.ArtistId);

            //modelBuilder.Entity<Album>()
            //    .HasMany(al => al.Songs)
            //    .WithOne(s => s.Album)
            //    .HasForeignKey(s => s.AlbumId);

            //modelBuilder.Entity<Album>()
            //    .HasOne(al => al.Genres);

            modelBuilder.Entity<Artist>(ar =>
            {
                ar.Property(ar => ar.Name).IsRequired();

                ar.HasMany(ar => ar.Albums)
                .WithOne(al => al.Artist)
                .HasForeignKey(al => al.ArtistId);

                ar.HasMany(ar => ar.Songs)
                .WithOne(s => s.Artist)
                .HasForeignKey(s => s.ArtistId);

            });

            modelBuilder.Entity<Album>(al =>
            {
                al.Property(al => al.Title).IsRequired();
                al.Property(al => al.ArtistId).IsRequired();

                al.HasMany(al => al.Songs)
                .WithOne(s => s.Album)
                .HasForeignKey(s => s.AlbumId);

                al.HasOne(al => al.Genres);
            });


            modelBuilder.Entity<Song>(s =>
            {
                s.Property(s => s.Title).IsRequired();
                s.Property(s => s.ArtistId).IsRequired();

            });


        }
    }
}
