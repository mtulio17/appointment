namespace Appointment.Backend.Domain.SharedKernel.Errors;

public static class EmailErrors
{
    public static Error InvalidEmail = Error.Validation("Email.InvalidEmail", "The email is not a valid email.");
}
