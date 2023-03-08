using Microsoft.AspNetCore.SignalR;
using BikeAPI.Models;
namespace BikeAPI.Models;

public class OrderInfoHub : Hub<IOrderInfoClient>
{
    public async Task SendOrderUpdate(OrderUnix order, MyDbContext context)
    {
        //try{
            var newOrder = order.convert(context);
            await Clients.All.ReciveOrderNew(newOrder);
        //}
        //catch{
        //    await Clients.All.ReciveOrderNew(new OrderInfoJoined{
        //        OrdererName = "Error"
        //    });
        //}
        
    }
}