using Appointment.Backend.Domain.Activities.Enums;
using Appointment.Backend.Domain.Activities.Events;
using Appointment.Backend.Domain.Activities.Hosts;
using Appointment.Backend.Domain.Activities.Invitations;
using Appointment.Backend.Domain.Activities.Participants;
using Appointment.Backend.Domain.Activities.Requests;
using Appointment.Backend.Domain.Activities.ValueObjects;
using Appointment.Backend.Domain.SharedKernel;
using Appointment.Backend.Domain.SharedKernel.Abstractions;
using Appointment.Backend.Domain.SharedKernel.ValueObjects;

namespace Appointment.Backend.Domain.Activities;

public sealed class Activity : Entity<ActivityId>, IAggregateRoot
{
    private readonly List<Participant> _participants = [];
    private readonly List<Invitation> _invitations = [];
    private readonly List<Request> _requests = [];
    //private readonly List<ModeratorId> _moderatorIds = new(); // Moderator could be a participant type.

    public Host Host { get; private set; } = default!;
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public ActivityCategory Category { get; private set; } = default!;// At first it will be a enumerable.
    public DateTimeOffset StartDate { get; private set; } = default!;
    public DateTimeOffset EndDate { get; private set; } = default!;
    public Address Address { get; private set; } = default!;
    public Gender GenderRestriction { get; private set; } = default!;
    public int MinimumAge { get; private set; } = default!;
    public ActivityStatus Status { get; private set; } = default!;

    public IReadOnlyList<Participant> Participans => _participants.AsReadOnly();
    public IReadOnlyList<Invitation> Invitations => _invitations.AsReadOnly();
    public IReadOnlyList<Request> Requests => _requests.AsReadOnly();

    private Activity() { }

    private Activity(
        ActivityId id,
        string name, //check invariants
        string description,
        Host host,
        ActivityCategory category,
        DateTimeOffset startDate,
        DateTimeOffset endDate,
        Address address,
        Gender genderRestriction,
        int minimumAge) : base(id)
    {
        Name = name;
        Description = description;
        Category = category;
        Host = host;
        StartDate = startDate;
        EndDate = endDate;
        Address = address;
        GenderRestriction = genderRestriction;
        MinimumAge = minimumAge;
        Status = ActivityStatus.Created; // Always start as unconfirmed.
    }

    public static Activity Create(
        Host host,
        string name,
        string description,
        ActivityCategory category,
        DateTimeOffset startDate,
        DateTimeOffset endDate,
        Address address,
        Gender genderRestriction,
        int minimumAge)
    {
        var activity = new Activity(
            new ActivityId(Guid.NewGuid()),
            name,
            description,
            host,
            category,
            startDate,
            endDate,
            address,
            genderRestriction,
            minimumAge);

        var activityCreatedDomainEvent = new ActivityCreatedDomainEvent(
            Guid.NewGuid(),
            activity.Id.Value,
            activity.Name);

        activity.AddDomainEvent(activityCreatedDomainEvent);

        return activity;
    }

    public void UpdateActivityDetails(string name, string description)
    {
        Name = name;
        Description = description;
    }

    // [^1] We can reduce over-engineering changing type void and evaluating:
    // if (_participants.Contains(participant)) return;
    // to avoid implementing railway pattern here.
    public Result AddParticipant(Participant participant)
    {
        if (_participants.Contains(participant)) return Result.Failure(ActivityErrors.ParticipantAlreadyExists);

        _participants.Add(participant);

        return Result.Success();
    }

    // [^2] We can reduce over-engineering changing type void and evaluating:
    // if (!_participants.Contains(participant)) return;
    // to avoid implementing railway pattern here.
    public Result RemoveParticipant(Participant participant)
    {
        if (!_participants.Contains(participant)) return Result.Failure(ParticipantErrors.ParticipantNotFound);

        _participants.Remove(participant);

        return Result.Success();
    }

    public void AddRequest(Request request)
    {
        _requests.Add(request);
    }

    public void RemoveRequest(Request request)
    {
        _requests.Remove(request);
    }

    public void ConfirmActivity()
    {
        Status = ActivityStatus.Confirmed;
    }

    public void StartActivity()
    {
        Status = ActivityStatus.Started;
    }

    public void FinishActivity()
    {
        Status = ActivityStatus.Finished;
    }

    public void CancelActivity()
    {
        Status = ActivityStatus.Canceled;
    }
}

// Resources:
// Always valid domain approach, Vladimir Khorikov.
// https://enterprisecraftsmanship.com/posts/always-valid-domain-model/
