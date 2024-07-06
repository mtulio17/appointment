using Appointment.Backend.Domain.Activities.Hosts;
using Appointment.Backend.Domain.Activities.Participants;
using Appointment.Backend.Domain.Activities.Participants.ValueObjects;
using Appointment.Backend.Domain.Activities.Requests;
using Appointment.Backend.Domain.Activities.ValueObjects;
using Appointment.Backend.Domain.SharedKernel;
using Appointment.Backend.Domain.Users;

namespace Appointment.Backend.Domain.Activities;

public sealed class ActivityService : IActivityService
{

    // Ensure if its enought complex to be a domain service method.
    public Activity CreateActivity(Host host, ActivityDetails activityDetails)
    {
        //if (activity.Host is not null) return Result.Failure<Activity>(Error.Validation("Activity.AlreadyHasAHost", "The activity already has a host."));
        //activity.AddHost(host);

        var activity = Activity.Create(
            host,
            activityDetails.activityName,
            activityDetails.activityDescription,
            activityDetails.activityCategory,
            activityDetails.startDate,
            activityDetails.endDate,
            activityDetails.address,
            activityDetails.genderRestriction,
            activityDetails.minimumAge);

        return activity;
    }

    public Result<Activity> ApplyToActivity(Activity activity, User requester)
    {
        // Check if user is already a participant.
        if (activity.Participans.Any(participant => participant.Id.Equals(requester.Id)))
        {
            return Result.Failure<Activity>(ActivityErrors.ParticipantAlreadyExists);
        }

        var request = Request.Create(requester.Id);

        activity.AddRequest(request);

        return activity;
    }

    public Result<Activity> AcceptRequest(Activity activity, Request request, User evaluator)
    {
        // Verify request belongs to activity.
        if (!activity.Requests.Contains(request)) return Result.Failure<Activity>(RequestErrors.RequestNotFound);

        // Verify if evaluator is host or moderator.
        if (activity.Host is null) return Result.Failure<Activity>(ActivityErrors.ActivityDoesNotHasAHost);
        if (!activity.Host.UserId.Equals(evaluator.Id) &&
            !activity.Participans.Any(p => p.IsModerator)) return Result.Failure<Activity>(ActivityErrors.EvaluatorUserHasNoPermissionsToEvaluateARequest);

        var result = request.AcceptRequest(evaluator.Id);

        if (result.IsFailure) return Result.Failure<Activity>(result.Error);

        return activity;
    }

    public Result RejectRequest(Request request, User evaluator) // Analize return type Result<Request>
    {
        var result = request.RejectRequest(evaluator.Id);

        if (result.IsFailure) return Result.Failure(result.Error);

        return Result.Success();
    }

    public Result<Activity> AbandonActivity(ParticipantId participantId, Activity activity) 
    {
        var participant = activity.Participans.FirstOrDefault(p => p.Id == participantId);
        if (participant is null) return Result.Failure<Activity>(ParticipantErrors.ParticipantNotFound);

        var result = activity.RemoveParticipant(participant);

        if (result.IsFailure) return Result.Failure<Activity>(result.Error);

        return activity;
    }
}
