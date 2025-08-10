namespace CarMarketAPI.DTOs
{
    public class ContactRequestResponseDto
    {
        public int Id { get; set; }

        // Contact Message Info
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }

        // Car Info
        public int CarId { get; set; }
        public string CarTitle { get; set; }
        public decimal CarPrice { get; set; }

        // User Info
        public int UserId { get; set; }
        public string BuyerFirstName { get; set; }
        public string BuyerLastName { get; set; }
        public string BuyerEmail { get; set; }
        public string BuyerPhone { get; set; }
    }

}
