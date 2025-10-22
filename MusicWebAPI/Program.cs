using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.Middleware;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;
using NLog.Web;
using System.Reflection;

namespace MusicWebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            // NLog: Setup NLog for Dependency injection
            builder.Logging.ClearProviders();
            builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Information);
            builder.Host.UseNLog();

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddDbContext<MusicWebDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("MusicWebAPILocalDbConnection")));

            builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

            builder.Services.AddScoped<ErrorHandlingMiddleware>();

            // add custom servicess
            builder.Services.AddScoped<IArtistService, ArtistService>();
            builder.Services.AddScoped<IAlbumService, AlbumService>();
            builder.Services.AddScoped<ISongService, SongService>();



            builder.Services.AddSwaggerGen();


            var app = builder.Build();

            app.UseMiddleware<ErrorHandlingMiddleware>();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();


            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MusicWeb API");
            });

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
