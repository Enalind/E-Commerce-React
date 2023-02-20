using System.ComponentModel.DataAnnotations;

namespace BikeAPI.Models;

public class UserBase
{
    public string Email { get; set; }
    public string Adress { get; set; }
    public string Name { get; set; }

    public User UserConvert()
    {
        return new User
        {
            Email = this.Email,
            Adress = this.Adress,
            Name = this.Name
        };
    }
}
public class User : UserBase
{
    [Key]
    public Guid UserId { get; set; }
    public List<Order> Orders { get; set; }
    public DateTime Created { get; set; }
}
