using Appointment.Backend.Domain.Activities.Requests.ValueObjects;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Domain.Activities.Requests.Events;

public sealed record RequestCreatedDomainEvent(RequestId requestId, UserId applicantId);
