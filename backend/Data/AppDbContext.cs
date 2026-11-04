using Microsoft.EntityFrameworkCore;
using MojiZadaci.Api.Models;

namespace MojiZadaci.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>(e =>
        {
            e.Property(t => t.Text).HasMaxLength(500).IsRequired();
        });
    }
}
