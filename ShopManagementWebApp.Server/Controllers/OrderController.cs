using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ShopManagementDbContext _context;
        private readonly IOrderService _service;

        public OrderController(ShopManagementDbContext context, IOrderService orderService)
        {
            _context = context;
            _service = orderService;
        }

        [HttpGet("/api/GetOrders")]
        public IEnumerable<Order> GetOrders()
        {
            return _service.GetOrders();
        }

        [HttpGet("/api/GetOrder({id})")]
        public Order? GetOrder(int id)
        {
            return _service.GetOrder(id);
        }

        [HttpPost("/api/AddOrder")]
        public bool AddOrder([FromBody] Order order)
        {
            return _service.AddOrder(order);
        }

        [HttpPost("/api/UpdateOrder")]
        public bool UpdateOrder([FromBody] Order order)
        {
            return _service.UpdateOrder(order);
        }

        [HttpDelete("/api/DeleteOrder({id})")]
        public bool DeleteOrder(int id)
        {
            return _service.DeleteOrder(id);
        }
    }
}
