using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Domain.Activities.Requests;

public static class RequestErrors
{
    public static Error RequestNotFound = Error.NotFound("Request.RequestNotFound", "The request was not found in the activity");
    public static Error RequestIsAlreadyAccepted = Error.Validation("Request.RequestIsAlreadyAccepted", "The request is already accepted.");
    public static Error RequestIsAlreadyRejected = Error.Validation("Request.RequestIsAlreadyRejected", "The request is already rejected.");
    public static Error RequestMustBePending = Error.Validation("Request.RequestMustBePending", "The request must be pending to be able to change as accepted or rejected.");
}
