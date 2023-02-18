﻿
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
    public DbSet<Order> Orders { get; set; }
    public DbSet<Bike> Bikes { get; set; }
}