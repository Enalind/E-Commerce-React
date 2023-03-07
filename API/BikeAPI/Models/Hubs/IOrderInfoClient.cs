namespace BikeAPI.Models;

public interface IOrderInfoClient
{
    Task ReciveInfoOrder(OrderInfoJoined order);
}
