using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly ShopManagementDbContext _context;
        private readonly IBasketService _service;

        public BasketController(ShopManagementDbContext context, IBasketService basketService)
        {
            _context = context;
            _service = basketService;
        }

        [HttpGet("/api/GetBasket({id})")]
        public Basket? GetBasket(int id)
        {
            return _service.GetBasket(id);
        }

        [HttpPost("/api/AddItemToBasket({id})")]
        public bool AddItemToBasket(int id, [FromBody] BasketItem item)
        {
            return _service.AddItemToBasket(id, item);
        }

        [HttpPost("/api/RemoveItemFromBasket({id})")]
        public bool RemoveItemFromBasket(int id, [FromBody] BasketItem item)
        {
            return _service.DeleteItemFromBasket(id, item);
        }

        [HttpDelete("/api/ClearBasket({id})")]
        public bool ClearBasket(int id)
        {
            return _service.ClearBasket(id);
        }
    }
}
