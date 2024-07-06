using Appointment.Backend.Domain.SharedKernel.Abstractions;

namespace Appointment.Backend.Domain.SharedKernel;

public record DomainEvent(Guid id) : IDomainEvent;
