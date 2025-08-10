namespace CarMarketAPI.Models
{
    public class ContactRequest
    {
        public int Id { get; set; }

        public int CarId { get; set; }
        public Car Car { get; set; } 

        public int SellerId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } 

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }


}
