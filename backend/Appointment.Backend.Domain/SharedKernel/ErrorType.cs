namespace Appointment.Backend.Domain.SharedKernel;

public enum ErrorType
{
    Failure = 0,
    Validation = 1,
    NotFound = 2,
    Conflict = 3
}