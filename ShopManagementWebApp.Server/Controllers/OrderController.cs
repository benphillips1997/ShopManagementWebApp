using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ShopManagementDbContext _context;
        private readonly IOrderService _orderService;
        private readonly IPaymentService _paymentService;

        public OrderController(ShopManagementDbContext context, IOrderService orderService, IPaymentService paymentService)
        {
            _context = context;
            _orderService = orderService;
            _paymentService = paymentService;
        }

        [HttpGet("/api/GetOrders")]
        public IEnumerable<Order> GetOrders()
        {
            return _orderService.GetOrders();
        }

        [HttpGet("/api/GetOrder/{id}")]
        public Order? GetOrder(int id)
        {
            return _orderService.GetOrder(id);
        }

        [HttpPost("/api/CreateOrder")]
        public bool CreateOrder([FromBody] Order order)
        {
            return _orderService.CreateOrder(order);
        }

        [HttpPost("/api/MakePayment")]
        public PaymentResponseDto MakePayment(PaymentRequestDto paymentRequest)
        {
            return _paymentService.ProcessPayment(paymentRequest);
        }

        [HttpPost("/api/UpdateOrder")]
        public bool UpdateOrder([FromBody] Order order)
        {
            return _orderService.UpdateOrder(order);
        }

        [HttpDelete("/api/DeleteOrder/{id}")]
        public bool DeleteOrder(int id)
        {
            return _orderService.DeleteOrder(id);
        }
    }
}
