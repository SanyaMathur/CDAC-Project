using CarMarketAPI.DTOs;
using CarMarketAPI.Models;

namespace CarMarketAPI.Services
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDTO dto);
        Task<User?> LoginAsync(LoginDTO dto);
    }
}
