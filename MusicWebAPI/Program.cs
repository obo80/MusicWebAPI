using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;

namespace MusicWebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddDbContext<MusicWebDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("RestaurantDbConnection")));



            builder.Services.AddSwaggerGen();


            var app = builder.Build();

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
