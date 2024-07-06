using Appointment.Backend.Domain.Activities.Hosts.ValueObjects;
using Appointment.Backend.Domain.SharedKernel.Abstractions;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Domain.Activities.Hosts;

public sealed class Host : Entity<HostId>, IAggregateRoot
{
    // private readonly List<ActivityId> _hostedActivities = [];

    public UserId UserId { get; private set; } = default!;

    private Host() { }

    private Host(
        HostId id,
        UserId userId) : base(id)
    {
        UserId = userId;
    }

    public static Host Create(UserId userId)
    {
        var host = new Host(
            new HostId(Guid.NewGuid()),
            userId);

        return host;
    }
}
