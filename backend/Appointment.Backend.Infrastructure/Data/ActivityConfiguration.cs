using Appointment.Backend.Domain.Activities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Appointment.Backend.Infrastructure.Data;

public sealed class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.HasKey(x=>x.Id);
        builder.ToTable("Activity");

        builder.Property(x=>x.Name).HasColumnType("VARCHAR").IsRequired();
        builder.Property(x=>x.Description).HasColumnType("VARCHAR").HasMaxLength(500).IsRequired(false);
    }
}