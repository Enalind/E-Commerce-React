namespace BikeAPI.Models;

public interface IOrderInfoClient
{
    Task ReciveOrderNew(OrderInfoJoined order);
}
