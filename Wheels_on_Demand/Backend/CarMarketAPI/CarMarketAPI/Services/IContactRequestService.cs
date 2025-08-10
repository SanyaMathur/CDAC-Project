using CarMarketAPI.DTOs;
using CarMarketAPI.Models;

namespace CarMarketAPI.Services
{
    public interface IContactRequestService
    {
        Task<ContactRequest> CreateAsync(ContactRequestDto dto);
        Task<List<ContactRequestResponseDto>> GetBySellerIdAsync(int sellerId);
    }

}
