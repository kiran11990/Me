using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using CrEST.Data.Models;
using Microsoft.EntityFrameworkCore;
using CrEST.BL;

namespace CrEST.API
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                              .SetBasePath(env.ContentRootPath)
                              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                              .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                              .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CrESTContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CrestDatabase")));
            // Add framework services.
            services.AddMvc();
            services.AddTransient<IApplicationRepository, ApplicationRepository>();
			services.AddTransient<IServiceRepository, ServiceRepository>();
			services.AddTransient<ISoWRepository, SoWRepository>();
			services.AddTransient<ISlpsRepository, SlpRepository>();
			services.AddTransient<ISupplierRepository, SupplierRepository>();
			services.AddTransient<ILoginRepository, Loginrepository>();
			


			services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseCors("MyPolicy");
            app.UseMvc();
        }
    }
}
