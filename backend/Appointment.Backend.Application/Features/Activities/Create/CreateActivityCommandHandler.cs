using Appointment.Backend.Application.Abstractions.Data;
using Appointment.Backend.Application.Abstractions.Messaging;
using Appointment.Backend.Domain.Activities;
using Appointment.Backend.Domain.Activities.Enums;
using Appointment.Backend.Domain.Activities.Hosts;
using Appointment.Backend.Domain.Activities.ValueObjects;
using Appointment.Backend.Domain.SharedKernel;
using Appointment.Backend.Domain.SharedKernel.ValueObjects;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Application.Features.Activities.Create;

internal sealed class CreateActivityCommandHandler : ICommandHandler<CreateActivityCommand>
{
    private readonly IActivityRepository _activityRepository;
    private readonly IActivityService _activityService;
    private readonly IUnitOfWork _unitOfWork;

    public CreateActivityCommandHandler(
        IActivityRepository activityRepository,
        IActivityService activityService,
        IUnitOfWork unitOfWork)
    {
        _activityRepository = activityRepository;
        _activityService = activityService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
    {
        var userId = new UserId(request.userId);

        var host = Host.Create(userId);

        string requestCategory = request.category;
        requestCategory.ToLower();

        string requestGenreRestriction = request.genderRestriction;
        requestGenreRestriction.ToLower();

        ActivityCategory activityCategory;
        Gender activityGenderRestriction;

        if (!Enum.TryParse(requestCategory, true, out activityCategory)) 
            return Result.Failure(ActivityErrors.WrongCategory);
     

        if (!Enum.TryParse(requestGenreRestriction, true, out activityGenderRestriction)) 
            return Result.Failure(ActivityErrors.WrongGenre);

        var address = new Address(
            request.street,
            request.city,
            request.state,
            request.zipCode);

        var activityDetails = new ActivityDetails(
            request.name,
            request.description,
            activityCategory,
            request.startDate,
            request.endDate,
            address,
            activityGenderRestriction,
            request.minimumAge);

        var result = _activityService.CreateActivity(host, activityDetails);

        //var result = _activityService.AddHost(host, activity);

        //if (result.IsFailure) return Result.Failure(result.Error);

        _activityRepository.Add(result);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
