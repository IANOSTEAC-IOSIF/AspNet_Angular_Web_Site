namespace Catstagram.Server.Infrastructure.Extensions
{
    using Catstagram.Server.Data;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
            => app
            .UseSwaggerUI(options =>
             {
                 options.SwaggerEndpoint("/swagger/v1/swagger.json", "My Catstagram API");
                 options.RoutePrefix = string.Empty;

             });

        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<CatstagramDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
