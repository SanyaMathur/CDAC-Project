using CarMarketAPI.DTOs;
using CarMarketAPI.Models;

namespace CarMarketAPI.Services
{
    public interface ICarService
    {
        Task<List<CarDTO>> GetAllCarsAsync();
        Task<CarDTO> GetCarByIdAsync(int id);
        Task<int> AddCarAsync(CarCreateDTO carDto);

        Task<List<CarDTO>> GetCarsBySellerIdAsync(int userId);
    }
}
