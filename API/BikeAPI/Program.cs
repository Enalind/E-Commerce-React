using BikeAPI.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
var MyAllowWebsiteOrigins = "_myAllowWebsiteOrigins";
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.WebHost.ConfigureKestrel(o => o.ListenLocalhost(7278));
builder.Services.AddDbContext<MyDbContext>(options => {
    options.UseNpgsql(builder.Configuration["Default"]);
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowWebsiteOrigins, policy =>
    {
        
        policy.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:5173", "http://localhost:8000", "http://localhost:5555")
            .AllowCredentials();
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
app.MapHub<OrderHub>("/hubs/order");
app.MapHub<OrderInfoHub>("/hubs/order/with");
app.MapGet("/products", async (MyDbContext context) => await context.Bikes.ToListAsync());
app.MapGet("/orders", async (MyDbContext context) => {
    var orders = await context.Orders.ToListAsync();
    return orders.ConvertAll<OrderUnix>(o => o.convertUnix());
    
});
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
app.MapGet("/orders/withperson/withproduct", async (MyDbContext context) =>
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
            o.ProductID,
        }
        ).Join(
            context.Bikes,
            combined => combined.ProductID,
            p => p.ProductID,
            (combined, p) => new {
                createdUnix = ((DateTimeOffset)combined.Created).ToUnixTimeSeconds(),
                combined.Orderer,
                combined.Quantity,
                combined.OrderID,
                p.Name
            }
        );
        
    return await query.ToListAsync();
});
app.MapPost("/users", async (MyDbContext context, UserBase user) => { 
    await context.AddAsync(user.UserConvert()); 
    await context.SaveChangesAsync();
    var createdID = new { id = context.Users.Where(u => u.Adress == user.Adress && u.Email == user.Email).SingleOrDefault().UserId };
    
    return Results.Ok(createdID); });
app.MapPost("/orders", async (MyDbContext context, OrderBase order, IHubContext<OrderInfoHub, IOrderInfoClient> hub) =>
{
    var convertedOrder = order.OrderConvert();
    
    await context.AddAsync(convertedOrder);
    await context.SaveChangesAsync();
    var created = await context.Orders.Where(o => o.UserId == convertedOrder.UserId && o.ProductID == convertedOrder.ProductID).FirstOrDefaultAsync();
    var unixTime = ((DateTimeOffset)created.Created).ToUnixTimeSeconds();

    await hub.Clients.All.ReciveOrderNew(convertedOrder.convertUnix().convert(context));
return Results.Ok();
});
app.MapPost("/products", async (MyDbContext context, BikeBase bike) => { await context.AddAsync(bike.BikeConvert()); await context.SaveChangesAsync(); return Results.Ok(); });
app.Run();
