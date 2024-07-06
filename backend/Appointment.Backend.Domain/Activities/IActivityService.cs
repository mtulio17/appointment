using Appointment.Backend.Domain.Activities.Hosts;
using Appointment.Backend.Domain.Activities.Participants.ValueObjects;
using Appointment.Backend.Domain.Activities.Requests;
using Appointment.Backend.Domain.Activities.ValueObjects;
using Appointment.Backend.Domain.SharedKernel;
using Appointment.Backend.Domain.Users;

namespace Appointment.Backend.Domain.Activities;

public interface IActivityService
{
    Activity CreateActivity(Host host, ActivityDetails activityDetails);
    Result<Activity> ApplyToActivity(Activity activity, User requester);
    Result<Activity> AcceptRequest(Activity activity, Request request, User evaluator);
    Result RejectRequest(Request request, User evaluator);
    Result<Activity> AbandonActivity(ParticipantId participantId, Activity activity);
}
