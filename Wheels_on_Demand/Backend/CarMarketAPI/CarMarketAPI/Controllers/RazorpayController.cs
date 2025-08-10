using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace CarMarketAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RazorpayController : ControllerBase
    {



        private readonly string _key = "rzp_test_bHy3SCwyhc154Q";
        private readonly string _secret = "qcOlqSoWsX2vX1PpqQMc6N4y";

        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody] PaymentRequest request)
        {
            try
            {
                RazorpayClient client = new RazorpayClient(_key, _secret);

                Dictionary<string, object> options = new Dictionary<string, object>
                {
                    { "amount", request.Amount * 100 }, // amount in paise
                    { "currency", "INR" },
                    { "receipt", $"rcpt_{Guid.NewGuid()}" },
                    { "payment_capture", 1 }
                };

                Order order = client.Order.Create(options);

                return Ok(new
                {
                    orderId = order["id"].ToString(),
                    amount = request.Amount,
                    currency = "INR",
                    key = _key
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Failed to create Razorpay order", error = ex.Message });
            }
        }
    }

    public class PaymentRequest
    {
        public int Amount { get; set; }
    }
}
