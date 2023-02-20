using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeAPI.Models;

public class BikeBase
{
    public string Name { get; set; }
    public int Price { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public Bike BikeConvert()
    {
        return new Bike
        {
            Name = this.Name,
            Price = this.Price,
            Image = this.Image,
            Description = this.Description
        };
    }
}
public class Bike : BikeBase
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProductID { get; set; }
    public List<Order> Orders { get; set; }
}