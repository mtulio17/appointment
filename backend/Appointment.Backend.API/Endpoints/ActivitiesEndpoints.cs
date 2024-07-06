using Appointment.Backend.Application.Features.Activities.Create;
using Appointment.Backend.Application.Features.Activities.GetAllFiltered;
using Carter;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Appointment.Backend.API.Endpoints;

public sealed class ActivitiesEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder routes)
    {
        var activities = routes.MapGroup("/api/activities");

        activities.MapPost("", CreateActivity);
        activities.MapGet("",GetAllActivitiesFiltered);
    }

        private static async Task<IResult> CreateActivity(
            [FromBody] CreateActivityRequest request,
            ISender sender,
            CancellationToken cancellationToken)
        {
            var command = new CreateActivityCommand(
                request.name,
                request.description,
                request.userId,
                request.category,
                request.startDate,
                request.endDate,
                request.street,
                request.city,
                request.state,
                request.zipCode,
                request.genderRestriction,
                request.minimumAge);

        await sender.Send(command);

        return Results.Created();
    }

    private static async Task<IResult> GetAllActivitiesFiltered(
        [FromRoute] GetAllFilteredQuery query,
        [FromServices] ISender sender,
        CancellationToken cancellation
    ){
        var results = await sender.Send(query);
        return Results.Json(results);
    }
}
