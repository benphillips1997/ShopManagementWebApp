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
        private readonly IBasketService _basketService;

        public BasketController(ShopManagementDbContext context, IBasketService basketService)
        {
            _context = context;
            _basketService = basketService;
        }

        [HttpGet("/api/GetBasket/{userId}")]
        public Basket? GetBasket(int userId)
        {
            return _basketService.GetBasket(userId);
        }

        [HttpPost("/api/AddItemToBasket/{basketId}")]
        public bool AddItemToBasket(int basketId, [FromBody] BasketItem item)
        {
            return _basketService.AddItemToBasket(basketId, item);
        }

        [HttpPost("/api/RemoveItemFromBasket/{basketId}")]
        public bool RemoveItemFromBasket(int basketId, [FromBody] BasketItem item)
        {
            return _basketService.DeleteItemFromBasket(basketId, item);
        }

        [HttpDelete("/api/ClearBasket/{basketId}")]
        public bool ClearBasket(int basketId)
        {
            return _basketService.ClearBasket(basketId);
        }
    }
}
