namespace Appointment.Backend.Domain.Activities.ValueObjects;

public sealed record Category(
    string categoryName,
    string categoryDescription,
    string categoryIcon);
