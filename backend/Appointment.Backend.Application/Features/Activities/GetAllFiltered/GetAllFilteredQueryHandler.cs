using Appointment.Backend.Application.Abstractions.Messaging;
using Appointment.Backend.Domain.Activities;
using Appointment.Backend.Domain.Host;
using Appointment.Backend.Domain.SharedKernel;

namespace Appointment.Backend.Application.Features.Activities.GetAllFiltered;

public class GetAllFilteredQueryHandler : ICommandHandler<GetAllFilteredQuery>
{
    private readonly IActivityRepository _activityRepository;
    public GetAllFilteredQueryHandler(IActivityRepository activityRepository)
    {
        _activityRepository = activityRepository;
    }

    public async Task<Result> Handle(GetAllFilteredQuery request, CancellationToken cancellationToken)
    {
       Address? address = null;
       HostId? hostId = null;
        if(request.street != null && request.city != null && request.state != null){
            address = new Address(request.street,request.city,request.state);
        }
        if(request.hostId != Guid.Empty && request.hostId != null){
            hostId = new HostId(request.hostId.Value);
        }
        IQueryable<Activity> activities = await _activityRepository.GetAllAsync();
        return Result.Success(activities);
    }

}