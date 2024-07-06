namespace Appointment.Backend.Domain.SharedKernel.Abstractions;

public abstract class Entity<TId> : IEquatable<Entity<TId>>
    where TId : class
{
    private readonly List<IDomainEvent> _domainEvents = new();

    public TId Id { get; protected set; }

    public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected Entity(TId id)
    {
        Id = id;
    }

#pragma warning disable CS8618
    // For EF Core purposes.
    protected Entity()
    {
    }
#pragma warning restore CS8618

    // Id equality
    public override bool Equals(object? obj)
    {
        return obj is Entity<TId> entity && Id.Equals(entity.Id);
    }

    // Reference equality
    public bool Equals(Entity<TId>? other)
    {
        return Equals((object?)other);
    }

    public static bool operator ==(Entity<TId> left, Entity<TId> right)
    {
        return Equals(left, right);
    }

    public static bool operator !=(Entity<TId> left, Entity<TId> right)
    {
        return !Equals(left, right);
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }

    public void AddDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}
