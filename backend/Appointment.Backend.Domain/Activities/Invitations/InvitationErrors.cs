using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Domain.Activities.Invitations;

public static class InvitationErrors
{
    public static Error InvitationAlreadyBeenAccepted = Error.Validation("Invitation.InvitationAlreadyBeenAccepted", "The invitation has already been accepted.");
    public static Error InvitationAlreadyBeenRejected = Error.Validation("Invitation.InvitationAlreadyBeenRejected", "The invitation has already been rejected.");
    public static Error InvitationAlreadyBeenExpired = Error.Validation("Invitation.InvitationAlreadyBeenExpired", "The invitation has already been expired.");
}