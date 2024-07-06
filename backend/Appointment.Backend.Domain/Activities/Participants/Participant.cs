using Appointment.Backend.Domain.Activities.Participants.ValueObjects;
using Appointment.Backend.Domain.SharedKernel.Abstractions;
using Appointment.Backend.Domain.SharedKernel.ValueObjects;
using Appointment.Backend.Domain.Users.ValueObjects;

namespace Appointment.Backend.Domain.Activities.Participants;

public sealed class Participant : Entity<ParticipantId>, IAggregateRoot
{
    public UserId UserId { get; private set; }
    public string Name { get; private set; }
    public string LastName { get; private set; }
    public int Age { get; private set; }
    public Location Location { get; private set; }
    public Gender Gender { get; private set; }
    public bool IsModerator { get; private set; }

    private Participant() { }

    private Participant(
        ParticipantId id,
        UserId userId,
        string name,
        string lastName,
        int age,
        Location location,
        Gender gender,
        bool isModerator) : base(id)
    {
        UserId = userId;
        Name = name;
        LastName = lastName;
        Age = age;
        Location = location;
        Gender = gender;
        IsModerator = isModerator;
    }

    public static Participant Create(
        UserId userId,
        string name,
        string lastName,
        int age,
        Location location,
        Gender gender)
    {
        var participant = new Participant(
            new ParticipantId(Guid.NewGuid()),
            userId,
            name,
            lastName,
            age,
            location,
            gender,
            false);

        return participant;
    }
}
