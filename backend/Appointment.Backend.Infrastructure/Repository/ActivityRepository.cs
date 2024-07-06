using Appointment.Backend.Domain.Activities;
using Appointment.Backend.Domain.Host;
using Appointment.Backend.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Appointment.Backend.Infrastructure.Repository;

public sealed class ActivityRepository(ApplicationDbContext context) : IActivityRepository
{
    private readonly ApplicationDbContext _db = context;

    public async void Add(Activity activity)
    {
        try
        {
            _db.Activities.Add(activity);
            await _db.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw;
        }
    }

    public void Delete(Activity activity)
    {
        throw new NotImplementedException();
    }

    public async Task<IQueryable<Activity>> GetAllAsync()
    {
        var activities = await _db.Activities.ToListAsync();
        return activities.AsQueryable();
    }

    public Task<IQueryable<Activity>> GetAllAsync(string? name, HostId? hostId, string? category, DateTimeOffset? startDate, DateTimeOffset? endDate, Address? address)
    {
        throw new NotImplementedException();
    }

    public Task<Activity?> GetByIdAsync(ActivityId activityId)
    {
        throw new NotImplementedException();
    }

    public void Update(Activity activity)
    {
        throw new NotImplementedException();
    }
}