namespace CarMarketAPI.DTOs
{
    public class ContactRequestDto
    {
        public int CarId { get; set; }

        public int SellerId { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Message { get; set; }
    }

}
