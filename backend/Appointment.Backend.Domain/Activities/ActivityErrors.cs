using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Domain.Activities;

public static class ActivityErrors
{
    public static Error ActivityNotFound = Error.NotFound("Activity.ActivityNotFound", "The activity was not found.");
    public static Error ParticipantAlreadyExists = Error.Validation("Activity.ParticipantAlreadyExists", "The participant is already confirmed in the activity.");
    public static Error ActivityDoesNotHasAHost = Error.Validation("Activity.ActivityDoesNotHasAHost", "The activity does not have a host yet.");
    public static Error EvaluatorUserHasNoPermissionsToEvaluateARequest = Error.Validation("Activity.EvaluatorUserHasNoPermissionsToEvaluateARequest", "The evaluator user has no permission to evaluate the request.");
    public static Error WrongCategory = Error.Validation("Activity.WrongCategory", "The category does not match any activity categories.");
    public static Error WrongGenre = Error.Validation("Activity.WrongGenre", "The genre does not match any activity genres");
}
