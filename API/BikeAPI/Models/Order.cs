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
}
