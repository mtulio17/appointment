using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Appointment.Backend.Infrastructure.Context;

public sealed class ContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
//         var configuration = new ConfigurationBuilder()
// .SetBasePath(Directory.GetCurrentDirectory())
// .AddJsonFile("appsettings.json")
// .Build();
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseNpgsql(args[0].ToString().Trim());
        return new ApplicationDbContext(optionsBuilder.Options);
    }

    
}