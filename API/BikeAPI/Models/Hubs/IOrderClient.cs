namespace BikeAPI.Models;

public interface IOrderClient
{
    Task ReciveOrder(OrderUnix order);
}
