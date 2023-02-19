using BikeAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var MyAllowWebsiteOrigins = "_myAllowWebsiteOrigins";
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MyDbContext>(options => {
    options.UseNpgsql(builder.Configuration["Default"]);
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowWebsiteOrigins, policy =>
    {
        policy.AllowAnyOrigin();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowWebsiteOrigins);


app.MapGet("/products", async (MyDbContext context) => await context.Bikes.ToListAsync());
app.MapGet("/products/fuzzy/", (MyDbContext context, string match) => context.Bikes.FromSqlRaw("SELECT * FROM \"Bikes\" WHERE DIFFERENCE(\"Name\", {0}) > 2", match));

app.Run();
