using CarMarketAPI.DTOs;
using CarMarketAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarMarketAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactRequestController : ControllerBase
    {
        private readonly IContactRequestService _service;

        public ContactRequestController(IContactRequestService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContactRequestDto dto)
        {
            if (dto == null) return BadRequest("Invalid request data");

            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [HttpGet("seller/{sellerId}")]
        public async Task<IActionResult> GetBySeller(int sellerId)
        {
            var requests = await _service.GetBySellerIdAsync(sellerId);
            return Ok(requests);
        }
    }

}
