using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Domain.Activities.Participants;

public static class ParticipantErrors
{
    public static Error ParticipantNotFound = Error.NotFound("Participant.ParticipantNotFound", "The participant was not found.");
}
