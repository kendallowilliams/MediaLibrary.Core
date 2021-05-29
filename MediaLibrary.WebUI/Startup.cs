using MediaLibrary.Shared.Services;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.HostedServices;
using MediaLibrary.WebUI.Services;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MediaLibrary.WebUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            MefService mefService = new MefService(AppDomain.CurrentDomain.BaseDirectory, Configuration);

            services.AddControllersWithViews();
            services.AddHostedService<BackgroundQueueHostedService>();
            services.AddSingleton(typeof(IMefService), mefService);
            services.AddSingleton(typeof(IBackgroundTaskQueueService), typeof(BackgroundTaskQueueService)); 
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            services.AddAuthorization();
            services.AddResponseCompression();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseResponseCompression();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=MediaLibrary}/{action=Index}/{id?}");
            });
        }
    }
}
