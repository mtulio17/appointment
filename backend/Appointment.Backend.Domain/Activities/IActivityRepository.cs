using Appointment.Backend.Domain.Activities.Hosts.ValueObjects;
using Appointment.Backend.Domain.Activities.ValueObjects;

namespace Appointment.Backend.Domain.Activities;

public interface IActivityRepository
{
    // Cancellation token should be passed here?
    Task<Activity?> GetByIdAsync(ActivityId activityId);
    Task<IQueryable<Activity>> GetAllAsync();
    Task<IQueryable<Activity>> GetAllAsync(
        string? name,
        HostId? hostId,
        string? category,
        DateTimeOffset? startDate,
        DateTimeOffset? endDate,
        Address? address 
        );
    void Add(Activity activity);
    void Update(Activity activity);
    void Delete(Activity activity);
}
