using Appointment.Backend.Domain.Activities.Enums;
using Appointment.Backend.Domain.Activities.Requests.ValueObjects;
using Appointment.Backend.Domain.SharedKernel;
using Appointment.Backend.Domain.SharedKernel.Abstractions;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Domain.Activities.Requests;

public sealed class Request : Entity<RequestId>
{
    public UserId Applicant { get; private set; } = default!;
    public UserId? ResponsedBy { get; private set; } = default!; // Check this out later.
    public RequestStatus Status { get; private set; } = default!;
    public DateTimeOffset CreatedAt { get; private set; } = default!;
    public DateTimeOffset? AcceptedAt { get; private set; } = default!;
    public DateTimeOffset? RejectedAt { get; private set; } = default!;

    private Request() { }

    private Request(
        RequestId id,
        UserId applicant,
        UserId? respondedBy,
        RequestStatus status,
        DateTimeOffset createdAt,
        DateTimeOffset? acceptedAt,
        DateTimeOffset? rejectedAt) : base(id)
    {
        Applicant = applicant ?? throw new ArgumentNullException(nameof(applicant));
        ResponsedBy = respondedBy ?? throw new ArgumentNullException(nameof(respondedBy));
        Status = status;
        CreatedAt = createdAt;
        AcceptedAt = acceptedAt;
        RejectedAt = rejectedAt;
    }

    public static Request Create(UserId applicant)
    {
        var request = new Request(
            new RequestId(Guid.NewGuid()),
            applicant,
            null,
            RequestStatus.Pending,
            DateTimeOffset.Now,
            null,
            null);

        return request;
    }

    // [^1] We can reduce over-engineering changing type void and evaluating:
    // if (Status != RequestStatus.Pending || Status == RequestStatus.Rejected) return;
    // to avoid implementing railway pattern here.
    public Result AcceptRequest(UserId evaluator)
    {
        if (Status == RequestStatus.Rejected) return Result.Failure(RequestErrors.RequestIsAlreadyAccepted);
        if (Status == RequestStatus.Rejected) return Result.Failure(RequestErrors.RequestMustBePending);

        Status = RequestStatus.Accepted;
        ResponsedBy = evaluator;
        AcceptedAt = DateTimeOffset.UtcNow;

        return Result.Success();
    }

    // IDEM ^1
    public Result RejectRequest(UserId evaluator)
    {
        if (Status == RequestStatus.Rejected) return Result.Failure(RequestErrors.RequestIsAlreadyRejected);
        if (Status == RequestStatus.Accepted) return Result.Failure(RequestErrors.RequestMustBePending);

        Status = RequestStatus.Rejected;
        ResponsedBy = evaluator;
        RejectedAt = DateTimeOffset.UtcNow;

        return Result.Success();
    }
}