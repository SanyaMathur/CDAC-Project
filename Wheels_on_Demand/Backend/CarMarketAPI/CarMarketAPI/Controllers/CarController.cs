using CarMarketAPI.DTOs;
using CarMarketAPI.Models;
using CarMarketAPI.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CarController : ControllerBase
{
    private readonly ICarService _carService;

    public CarController(ICarService carService)
    {
        _carService = carService;
    }

    [HttpGet]
    public async Task<ActionResult<List<CarDTO>>> GetAllCars()
    {
        var cars = await _carService.GetAllCarsAsync();
        return Ok(cars);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CarDTO>> GetCarById(int id)
    {
        var car = await _carService.GetCarByIdAsync(id);
        if (car == null)
            return NotFound();
        return Ok(car);
    }

    [HttpPost]
    public async Task<ActionResult> AddCar([FromBody] CarCreateDTO carDto)
    {
        try
        {
            int newCarId = await _carService.AddCarAsync(carDto);
            return Created("", new { message = "Car added successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("by-seller/{userId}")]
    public async Task<IActionResult> GetCarsBySeller(int userId)
    {
        var cars = await _carService.GetCarsBySellerIdAsync(userId);
        return Ok(cars);
    }


}
