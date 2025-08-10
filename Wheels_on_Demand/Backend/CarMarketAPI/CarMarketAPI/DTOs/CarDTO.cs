namespace CarMarketAPI.DTOs
{
    public class CarDTO
    {
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
        public string Drivetrain { get; set; }

        public UserDTO User { get; set; }
        public List<string> ImageUrls { get; set; }
        public List<string> Features { get; set; }
    }

    

}
