using Appointment.Backend.Application.Abstractions.Messaging;

namespace Appointment.Backend.Application.Features.Activities.Create;

public sealed record CreateActivityCommand(
    string name,
    string description,
    Guid userId,
    string category,
    DateTimeOffset startDate,
    DateTimeOffset endDate,
    string street,
    string city,
    string state,
    string zipCode,
    string genderRestriction,
    int minimumAge) : ICommand;