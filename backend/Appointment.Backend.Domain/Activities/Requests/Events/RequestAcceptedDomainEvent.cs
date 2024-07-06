using Appointment.Backend.Domain.Activities.Requests.ValueObjects;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Domain.Activities.Requests.Events;

public sealed record RequestAcceptedDomainEvent(
    RequestId requestId,
    UserId applicant,
    UserId acceptedBy);
