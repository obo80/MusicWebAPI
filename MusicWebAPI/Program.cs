using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MusicWebAPI.Data;
using MusicWebAPI.DTO;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.DTO.Validators;
using MusicWebAPI.Entities.User;
using MusicWebAPI.Middleware;
using MusicWebAPI.Seeders;
using MusicWebAPI.Services;
using MusicWebAPI.Services.Interfaces;
using MusicWebAPI.Utils.GetFromQueryOptions;
using NLog.Web;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

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

            //authentication settings
            var authenticationSettings = new AuthenticationSettings();
            builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);
            builder.Services.AddSingleton(authenticationSettings);
            builder.Services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = "Bearer";
                option.DefaultScheme = "Bearer";
                option.DefaultChallengeScheme = "Bearer";
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = authenticationSettings.JwtIssuer,
                    ValidAudience = authenticationSettings.JwtIssuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey)),
                };
            });

            // Add services to the container.
            builder.Services.AddControllers()
                .AddJsonOptions(option => option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            builder.Services.AddDbContext<MusicWebDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("MusicWebAPILocalDbConnection")));

            builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

            builder.Services.AddScoped<ErrorHandlingMiddleware>();

            builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

            //for Fluent Validator nuget
            builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
            builder.Services.AddScoped<IValidator<UpdateUserDto>, UpdateUserDtoValidator>();
            builder.Services.AddScoped<IValidator<LoginDto>, LoginDtoValidator>();
            builder.Services.AddScoped<IValidator<RatingDto>, RatingDtoValidator>();
            builder.Services.AddScoped<IValidator<FromQueryOptions>, FromQueryOptionsValidator>();

            //builder.Services.AddScoped<IValidator<RestaurantQuery>, RestaurantQueryValidator>();
            builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly).AddFluentValidationAutoValidation();

            // add custom servicess
            builder.Services.AddScoped<IArtistService, ArtistService>();
            builder.Services.AddScoped<IAlbumService, AlbumService>();
            builder.Services.AddScoped<ISongService, SongService>();
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IArtistRatingService, ArtistRatingService>();
            builder.Services.AddScoped<IAlbumRatingService, AlbumRatingService>();
            builder.Services.AddScoped<ISongRatingService, SongRatingService>();


            builder.Services.AddScoped<MainSeeder>();



            builder.Services.AddSwaggerGen();


            var app = builder.Build();

            // Seed the database
            var scope = app.Services.CreateScope();
            var seeder = scope.ServiceProvider.GetRequiredService<MainSeeder>();
            seeder.Seed();


            app.UseMiddleware<ErrorHandlingMiddleware>();


            app.UseAuthentication();
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
