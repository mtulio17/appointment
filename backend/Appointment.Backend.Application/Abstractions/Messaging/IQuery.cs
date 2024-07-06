using MediatR;

namespace Appointment.Backend.Application.Abstractions.Messaging;

public interface IQuery<TResponse> : IRequest<TResponse> { }
