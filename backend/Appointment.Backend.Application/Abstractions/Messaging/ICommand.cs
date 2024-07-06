using Appointment.Backend.Domain.SharedKernel;
using MediatR;

namespace Appointment.Backend.Application.Abstractions.Messaging;

public interface ICommand : IRequest<Result>, ICommandBase { }

public interface ICommand<TResponse> : IRequest<Result<TResponse>>, ICommandBase { }

public interface ICommandBase { }
