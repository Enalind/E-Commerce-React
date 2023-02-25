using BikeAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
        policy.AllowAnyHeader();
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
app.MapGet("/products/byid", async (MyDbContext context, int id) => await context.Bikes.Where(p => p.ProductID == id).FirstOrDefaultAsync());
app.MapGet("/orders/withperson", async (MyDbContext context) =>
{
    var query = context.Orders.Join(context.Users,
        o => o.UserId,
        u => u.UserId,
        (o, u) => new
        {
            o.Created,
            o.OrderID,
            Quantity = o.NrBikesOrdered,
            Orderer = u.Name,
            o.ProductID
        }
        );
    return await query.ToListAsync();
});
app.MapPost("/users", async (MyDbContext context, UserBase user) => { await context.AddAsync(user.UserConvert()); await context.SaveChangesAsync(); return Results.Ok(new { id = context.Users.Where(u => u.Adress == user.Adress && u.Email == user.Email).SingleOrDefault().UserId }); });
app.MapPost("/orders", async (MyDbContext context, OrderBase order) => { await context.AddAsync(order.OrderConvert()); await context.SaveChangesAsync(); return Results.Ok(); });
app.MapPost("/products", async (MyDbContext context, BikeBase bike) => { await context.AddAsync(bike.BikeConvert()); await context.SaveChangesAsync(); return Results.Ok(); });
app.Run();
