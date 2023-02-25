namespace BikeAPI.Models;

public interface IOrderClient
{
    Task ReciveOrder(Order order);
}
