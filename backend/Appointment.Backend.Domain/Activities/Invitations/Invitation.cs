using Appointment.Backend.Domain.Activities.Enums;
using Appointment.Backend.Domain.Activities.Hosts.ValueObjects;
using Appointment.Backend.Domain.Activities.Invitations.ValueObjects;
using Appointment.Backend.Domain.SharedKernel;
using Appointment.Backend.Domain.SharedKernel.Abstractions;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Domain.Activities.Invitations;

public sealed class Invitation : Entity<InvitationId>
{
    public HostId Sender { get; private set; } = default!; // If the sender will be a host or moderator, convert the type to UserId.
    public UserId Receiver { get; private set; } = default!;
    // public Email ReceiverEmail { get; private set; } = default!; // Maybe we need another entity o service to manage email invitations.
    public string Message { get; private set; } = default!;
    public InvitationStatus Status { get; private set; } = default!;
    public DateTimeOffset CreatedAt { get; private set; } = default!;
    public DateTimeOffset ExpiresAt { get; private set; } = default!;
    public DateTimeOffset? AcceptedAt { get; private set; } = default!;
    public DateTimeOffset? RejectedAt { get; private set; } = default!;

    private Invitation() { }

    private Invitation(
        InvitationId id,
        HostId sender,
        UserId receiver,
        string message,
        InvitationStatus status,
        DateTimeOffset createdAt,
        DateTimeOffset expiresAt,
        DateTimeOffset? acceptedAt,
        DateTimeOffset? rejectedAt) : base(id)
    {
        Sender = sender ?? throw new ArgumentNullException(nameof(sender));
        Receiver = receiver ?? throw new ArgumentNullException(nameof(receiver));
        Message = message ?? throw new ArgumentNullException(nameof(message));
        Status = status;
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
        AcceptedAt = acceptedAt;
        RejectedAt = rejectedAt;
    }

    public static Invitation Create(
        HostId hostId,
        UserId receiver,
        string message,
        DateTimeOffset expiresAt)
    {
        var invitation = new Invitation(
            new InvitationId(Guid.NewGuid()),
            hostId,
            receiver,
            message,
            InvitationStatus.Pending,
            DateTimeOffset.UtcNow,
            expiresAt,
            null,
            null);

        return invitation;
    }

    public void AcceptInvitation()
    {
        Status = InvitationStatus.Accepted;
        AcceptedAt = DateTimeOffset.UtcNow;
    }

    public void RejectInvitation()
    {
        Status = InvitationStatus.Rejected;
        RejectedAt = DateTimeOffset.UtcNow;
    }

    public Result ExpireInvitation()
    {
        if (Status.Equals(InvitationStatus.Accepted)) return Result.Failure(InvitationErrors.InvitationAlreadyBeenAccepted);
        if (Status.Equals(InvitationStatus.Rejected)) return Result.Failure(InvitationErrors.InvitationAlreadyBeenRejected);
        if (Status.Equals(InvitationStatus.Expired)) return Result.Failure(InvitationErrors.InvitationAlreadyBeenExpired);

        Status = InvitationStatus.Expired;

        return Result.Success();
    }
}