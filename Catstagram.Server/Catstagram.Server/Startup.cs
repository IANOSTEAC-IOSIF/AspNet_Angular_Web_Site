
namespace Catstagram.Server
{
    using Catstagram.Server.Infrastructure.Extensions;
    using Catstagram.Server.Infrastructure.Filters;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    public class Startup
    {
        public Startup(IConfiguration configuration) => this.Configuration = configuration;
        

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
           => services

                .AddDatabase(this.Configuration)
                .AddIdentity()
                .AddJwtAuthentication(services.GetApplicationSettings(this.Configuration))
                .AddApplicationServices()
                .AddSwagger()
                .AddApiControllers();
        

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app
                .UseSwagger()
                .UseSwaggerUI()
                .UseRouting()
                .UseCors(options => options
                   .AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader())
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                })
                .ApplyMigrations();
            
        }
    }
}
