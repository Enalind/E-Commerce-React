using Microsoft.AspNetCore.SignalR;
using BikeAPI.Models;
namespace BikeAPI.Models;

public class OrderInfoHub : Hub<IOrderInfoClient>
{
    public async Task SendOrderUpdate(OrderUnix order, MyDbContext context)
    {

        await Clients.All.ReciveInfoOrder(order.convert(context));
    }
}