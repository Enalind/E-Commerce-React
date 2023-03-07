using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeAPI.Models;

public class OrderBase
{
    
    
    public int NrBikesOrdered { get; set; }
    public int ProductID { get; set; }
    public string UserId { get; set; }
    public Order OrderConvert()
    {
        return new Order
        {
            NrBikesOrdered = this.NrBikesOrdered,
            ProductID = this.ProductID,
            UserId = Guid.Parse(this.UserId)
        };
    }
    
}
public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int OrderID { get; set; }
    public DateTime Created { get; set; }
    [ForeignKey("Bike")]
    public int ProductID { get; set; }
    public Bike Bike { get; set; }
    
    public int NrBikesOrdered { get; set; }
    
    public User User { get; set; }
    public Guid UserId { get; set; }

    public OrderUnix convertUnix()
    {
        return new OrderUnix
        {
            ProductID = ProductID,
            OrderID = OrderID,
            Created = Created,
            NrBikesOrdered = NrBikesOrdered,
            UserId = UserId,
            CreatedUnix = ((DateTimeOffset)this.Created).ToUnixTimeSeconds()
        };
    }
    
}

public class OrderUnix
{
    public int ProductID { get; set; }
    public int OrderID { get; set; }
    public DateTime Created { get; set; }
    public int NrBikesOrdered { get; set; }
    public Guid UserId { get; set; }

    public long CreatedUnix { get; set; }
    public OrderInfoJoined convert(MyDbContext context){
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
            (combined, p) => new OrderInfoJoined{
                CreatedUnix = ((DateTimeOffset)combined.Created).ToUnixTimeSeconds(),
                OrdererName = combined.Orderer,
                NrBikesOrdered = combined.Quantity,
                OrderID = combined.OrderID,
                ProductName = p.Name
            }
        ).Where(c => c.OrderID == this.OrderID);
        
        try{
            return query.FirstOrDefault();
        }
        catch{
            throw new Exception("Failed to convert");
        }
    }
}

public class OrderInfoJoined{
    public long CreatedUnix { get; set; }
    public string OrdererName { get; set; }
    public int NrBikesOrdered { get; set; } 
    public string ProductName { get; set; }
    public int OrderID { get; set; }

    
}