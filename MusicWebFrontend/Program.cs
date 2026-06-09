namespace MusicWebFrontend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.WebHost.UseSetting(WebHostDefaults.PreventHostingStartupKey, "true");
            builder.Services.AddCors(options => {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });
            var app = builder.Build();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            //app.MapGet("/", () => "Hello World!");

            app.Run();
        }
    }
}
