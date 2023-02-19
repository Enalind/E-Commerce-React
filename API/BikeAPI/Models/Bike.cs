using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeAPI.Models;

public class Bike
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProductID { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public string Image { get; set; }
    public List<Order> Orders { get; set; }
}
