using CarMarketAPI.DTOs;
using CarMarketAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarMarketAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserDTO userDto)
        {
            if (id != userDto.Id)
                return BadRequest("User ID mismatch");

            var updatedUser = await _userService.UpdateAsync(id, userDto);
            if (updatedUser == null)
                return NotFound();

            return Ok(updatedUser);
        }
    }
}
