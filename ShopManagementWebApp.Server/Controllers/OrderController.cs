using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;
using System.IdentityModel.Tokens.Jwt;

namespace ShopManagementWebApp.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        
        [HttpGet("GetOrders")]
        public ActionResult<List<Order>> GetOrders()
        {
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            return Ok(_orderService.GetOrders(userId));
        }

        [HttpGet("GetOrder/{orderId}")]
        public ActionResult<Order> GetOrder(int orderId)
        {
            var order = _orderService.GetOrder(orderId);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost("ProcessOrder")]
        public ProcessOrderResponseDto ProcessOrder(ProcessOrderRequestDto paymentRequest)
        {
            return _orderService.ProcessOrder(paymentRequest);
        }

        [HttpPost("UpdateOrder")]
        public bool UpdateOrder([FromBody] UpdateOrderDto order)
        {
            return _orderService.UpdateOrder(order);
        }
    }
}
