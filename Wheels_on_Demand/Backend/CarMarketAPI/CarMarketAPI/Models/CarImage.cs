using CarMarketAPI.Models;
using System.ComponentModel.DataAnnotations;

public class CarImage
{
    public int Id { get; set; }

    public int CarId { get; set; }
    public Car Car { get; set; }

    [Required]
    public string ImageUrl { get; set; } // or TEXT
}
