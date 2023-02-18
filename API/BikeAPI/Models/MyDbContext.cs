
using Microsoft.EntityFrameworkCore;

namespace BikeAPI.Models;

public class MyDbContext : DbContext
{
    public MyDbContext()
    {

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(System.Environment.GetEnvironmentVariable("CONNECTION_STRING"));
    }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Bike> Bikes { get; set; }
}
