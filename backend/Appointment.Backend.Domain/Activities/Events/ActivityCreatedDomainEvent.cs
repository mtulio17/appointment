using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Domain.Activities.Events;

public sealed record ActivityCreatedDomainEvent(Guid id, Guid activityId, string name) : DomainEvent(id);