using Appointment.Backend.Domain.SharedKernel;
using Appointment.Backend.Domain.SharedKernel.Errors;
using System.Text.RegularExpressions;

namespace Appointment.Backend.Domain.Users.ValueObjects;

public sealed record UserEmail
{
    public string Value { get; init; }

    private UserEmail(string value)
    {
        Value = value ?? throw new ArgumentNullException(nameof(value));
    }

    public static Result<UserEmail> Create(string email)
    {
        // Check if email is valid.
        if (!IsValidEmail(email)) return Result.Failure<UserEmail>(EmailErrors.InvalidEmail);

        return new UserEmail(email);
    }

    private static bool IsValidEmail(string email)
    {
        if (string.IsNullOrEmpty(email)) return false;

        // Email regex (temporal)
        string emailRegexPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        if (!Regex.IsMatch(email, emailRegexPattern)) return false;

        return true;
    }
}