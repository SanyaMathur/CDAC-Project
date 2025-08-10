using CarMarketAPI.Data;
using CarMarketAPI.DTOs;
using CarMarketAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarMarketAPI.Services
{
    public class CarService : ICarService
    {
        private readonly ApplicationDbContext _context;

        public CarService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CarDTO>> GetAllCarsAsync()
        {
            var cars = await _context.Cars
                .Include(c => c.Images)
                .Include(c => c.Features)
                .Include(c => c.User)
                .ToListAsync();

            return cars.Select(c => new CarDTO
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Price = c.Price,
                Location = c.Location,
                Year = c.Year,
                Fuel = c.Fuel,
                Transmission = c.Transmission,
                Color = c.Color,
                Mileage = c.Mileage,
                Brand = c.Brand,
                Model = c.Model,
                Engine = c.Engine,
                Drivetrain = c.drivetrain,
                ImageUrls = c.Images?.Select(i => i.ImageUrl).ToList(),
                Features = c.Features?.Select(f => f.Name).ToList(),
                User = new UserDTO
                {
                    Id = c.User.Id,
                    FirstName = c.User.FirstName,
                    LastName = c.User.LastName,
                    Phone = c.User.Phone
                }
            }).ToList();
        }

        public async Task<CarDTO> GetCarByIdAsync(int id)
        {
            var car = await _context.Cars
                .Include(c => c.Images)
                .Include(c => c.Features)
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (car == null) return null;

            return new CarDTO
            {
                Id = car.Id,
                Title = car.Title,
                Description = car.Description,
                Price = car.Price,
                Location = car.Location,
                Year = car.Year,
                Fuel = car.Fuel,
                Transmission = car.Transmission,
                Color = car.Color,
                Mileage = car.Mileage,
                Brand = car.Brand,
                Model = car.Model,
                Engine = car.Engine,
                Drivetrain = car.drivetrain,
                ImageUrls = car.Images?.Select(i => i.ImageUrl).ToList(),
                Features = car.Features?.Select(f => f.Name).ToList(),
                User = new UserDTO
                {
                    Id = car.User.Id,
                    FirstName = car.User.FirstName,
                    LastName = car.User.LastName,
                    Phone = car.User.Phone
                }
            };
        }

        public async Task<int> AddCarAsync(CarCreateDTO carDto)
        {
            var user = await _context.Users.FindAsync(carDto.UserId);
            if (user == null) throw new Exception("User not found");

            var features = await _context.Features
                .Where(f => carDto.FeatureIds.Contains(f.Id)).ToListAsync();

            var car = new Car
            {
                Title = carDto.Title,
                Description = carDto.Description,
                Price = carDto.Price,
                Location = carDto.Location,
                Year = carDto.Year,
                Fuel = carDto.Fuel,
                Transmission = carDto.Transmission,
                Color = carDto.Color,
                Mileage = carDto.Mileage,
                Brand = carDto.Brand,
                Model = carDto.Model,
                Engine = carDto.Engine,
                drivetrain = carDto.Drivetrain,
                UserId = carDto.UserId,
                Features = features,
                Images = carDto.ImageUrls?.Select(url => new CarImage { ImageUrl = url }).ToList()
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return car.Id;
        }

        public async Task<List<CarDTO>> GetCarsBySellerIdAsync(int userId)
        {
            var cars = await _context.Cars
                .Include(c => c.Images)
                .Include(c => c.Features)
                .Include(c => c.User)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return cars.Select(c => new CarDTO
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Price = c.Price,
                Location = c.Location,
                Year = c.Year,
                Fuel = c.Fuel,
                Transmission = c.Transmission,
                Color = c.Color,
                Mileage = c.Mileage,
                Brand = c.Brand,
                Model = c.Model,
                Engine = c.Engine,
                Drivetrain = c.drivetrain,
                ImageUrls = c.Images?.Select(i => i.ImageUrl).ToList(),
                Features = c.Features?.Select(f => f.Name).ToList(),
                User = new UserDTO
                {
                    Id = c.User.Id,
                    FirstName = c.User.FirstName,
                    LastName = c.User.LastName,
                    Phone = c.User.Phone
                }
            }).ToList();
        }

    }



}
