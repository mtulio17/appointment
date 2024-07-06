using Appointment.Backend.Domain.Activities.Enums;
using Appointment.Backend.Domain.SharedKernel.ValueObjects;

namespace Appointment.Backend.Domain.Activities.ValueObjects;

public sealed record ActivityDetails(
    string activityName,
    string activityDescription,
    ActivityCategory activityCategory,
    DateTimeOffset startDate,
    DateTimeOffset endDate,
    Address address,
    Gender genderRestriction,
    int minimumAge);