using CarMarketAPI.Models;
using System.ComponentModel.DataAnnotations;

public class Feature
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    // Navigation
    public ICollection<Car> Cars { get; set; }
}
