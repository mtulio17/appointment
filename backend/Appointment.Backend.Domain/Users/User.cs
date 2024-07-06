using Appointment.Backend.Domain.Activities.ValueObjects;
using Appointment.Backend.Domain.SharedKernel.Abstractions;
using Appointment.Backend.Domain.SharedKernel.ValueObjects;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Domain.Users;

public sealed class User : Entity<UserId>, IAggregateRoot
{
    private readonly List<ActivityId> _hostedActivities = [];
    private readonly List<ActivityId> _upcomingActivities = [];
    private readonly List<ActivityId> _pastActivities = []; 

    public string Name { get; private set; } = default!;
    public string LastName { get; private set; } = default!;
    public int Age { get; private set; } = default!;
    public Location Location { get; private set; } = default!;
    public Gender Gender { get; private set; } = default!;
    public UserEmail Email { get; private set; } = default!;

    private User() { }

    private User(
        UserId id,
        string name,
        string lastName,
        int age,
        Location location,
        Gender gender) : base(id)
    {
        Name = name;
        LastName = lastName;
        Age = age;
        Location = location;
        Gender = gender;
    }

    public static User Create(
        string name,
        string lastName,
        int age,
        Location location,
        Gender gender)
    {
        var user = new User(
            new UserId(Guid.NewGuid()),
            name,
            lastName,
            age,
            location,
            gender);

        return user;
    }
}
