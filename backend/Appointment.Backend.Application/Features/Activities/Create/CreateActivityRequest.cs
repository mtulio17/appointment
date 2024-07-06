namespace Appointment.Backend.Application.Features.Activities.Create;

public sealed record CreateActivityRequest(
    string name,
    string description,
    Guid userId, // This should be obtained from session.
    string category,
    DateTimeOffset startDate,
    DateTimeOffset endDate,
    string street,
    string city,
    string state,
    string zipCode,
    string genderRestriction,
    int minimumAge);
