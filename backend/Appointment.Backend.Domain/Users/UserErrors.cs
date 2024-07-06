using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Domain.Users;

public static class UserErrors
{
    public static Error UserNotFound = Error.NotFound("User.UserNotFound", "The user was not found.");
}