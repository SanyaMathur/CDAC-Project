using CarMarketAPI.Data;
using CarMarketAPI.DTOs;
using CarMarketAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarMarketAPI.Services
{
    public class ContactRequestService : IContactRequestService
    {
        private readonly ApplicationDbContext _context;

        public ContactRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ContactRequest> CreateAsync(ContactRequestDto dto)
        {
            var request = new ContactRequest
            {
                CarId = dto.CarId,
                SellerId = dto.SellerId,
                UserId = dto.UserId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };

            _context.ContactRequests.Add(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<List<ContactRequestResponseDto>> GetBySellerIdAsync(int sellerId)
        {
            return await _context.ContactRequests
                .Where(c => c.SellerId == sellerId)
                .Include(c => c.Car)
                .Include(c => c.User)
                .Select(c => new ContactRequestResponseDto
                {
                    Id = c.Id,
                    Message = c.Message,
                    CreatedAt = c.CreatedAt,

                    CarId = c.CarId,
                    CarTitle = c.Car.Title,
                    CarPrice = c.Car.Price,

                    UserId = c.UserId,
                    BuyerFirstName = c.User.FirstName,
                    BuyerLastName = c.User.LastName,
                    BuyerEmail = c.User.Email,
                    BuyerPhone = c.User.Phone
                })
                .ToListAsync();
        }

    }

}
