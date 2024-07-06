using Appointment.Backend.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Appointment.Backend.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureLayer(this IServiceCollection service)
    {
        return service;
    }

    internal static IServiceCollection ConfigureDb(this IServiceCollection services,IConfiguration configuration){

        services.AddDbContext<ApplicationDbContext>(opts=>{
            opts.UseNpgsql(configuration.GetConnectionString("Databse"));
        });
        return services;
    }
}