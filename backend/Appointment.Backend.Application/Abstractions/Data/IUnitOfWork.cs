namespace Appointment.Backend.Application.Abstractions.Data;

internal interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
