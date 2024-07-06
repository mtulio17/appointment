using Appointment.Backend.Application.Abstractions.Messaging;
namespace Appointment.Backend.Application.Features.Activities.GetAllFiltered;

public sealed record GetAllFilteredQuery(
   string? name,
        Guid? hostId,
        string? category,
        DateTimeOffset? startDate,
        DateTimeOffset? endDate,
        string? street,
        string? city,
        string? state
) : ICommand;
