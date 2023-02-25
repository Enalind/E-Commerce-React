using Microsoft.AspNetCore.SignalR;
using BikeAPI.Models;
namespace BikeAPI.Models;

public class OrderHub : Hub<IOrderClient>
{
    public async Task SendOrderUpdate(Order order)
    {
        await Clients.All.ReciveOrder(order);
    }
}
