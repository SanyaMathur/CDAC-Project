using CarMarketAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarMarketAPI.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string Location { get; set; }

        public int Year { get; set; }

        public string Fuel { get; set; }

        public string Transmission { get; set; }

        public string Color { get; set; }

        public int Mileage { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public string Engine { get; set; }
        public string drivetrain { get; set; }

        // Foreign key to Users (who uploaded the car)
        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; }  // Navigation property

        public ICollection<CarImage> Images { get; set; }

        // Many-to-many
        public ICollection<Feature> Features { get; set; }
    }
}
