using CarMarketAPI.Data;
using CarMarketAPI.DTOs;
using CarMarketAPI.Models;
using BCrypt.Net;

namespace CarMarketAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> RegisterAsync(RegisterDTO dto)
        {
            // Check if email already exists
            var exists = _context.Users.Any(u => u.Email == dto.Email);
            if (exists)
                return "Email already exists";

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = hashedPassword
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return "Registration successful";
        }

        public async Task<User?> LoginAsync(LoginDTO dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null) return null;

            bool validPassword = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            return validPassword ? user : null;
        }
    }
}
