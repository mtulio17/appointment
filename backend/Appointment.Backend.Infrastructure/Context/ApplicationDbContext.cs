using Appointment.Backend.Domain.Activities;
using Appointment.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Appointment.Backend.Infrastructure.Context;

public  sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Activity> Activities = default!;
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration( new ActivityConfiguration());
    }
}