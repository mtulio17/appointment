using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Domain.Activities.ValueObjects;

public sealed record Address(
    string Street,
    string City,
    string State,
    string? ZipCode = null);


