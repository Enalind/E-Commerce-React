
using Microsoft.EntityFrameworkCore;

namespace BikeAPI.Models;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .Property(u => u.Created)
            .HasDefaultValueSql("now()");
        modelBuilder.Entity<User>()
            .Property(u => u.UserId)
            .HasDefaultValueSql("gen_random_uuid()");
        modelBuilder.Entity<Order>()
            .Property(o => o.Created)
            .HasDefaultValueSql("now()");
    }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Bike> Bikes { get; set; }
    public DbSet<User> Users { get; set; }
}
