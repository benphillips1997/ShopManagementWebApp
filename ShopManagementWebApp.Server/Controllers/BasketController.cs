using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService _basketService;

        public BasketController(IBasketService basketService)
        {
            _basketService = basketService;
        }
        
        [HttpGet("GetBasket/{userId}")]
        public Basket? GetBasket(int userId)
        {
            return _basketService.GetBasket(userId);
        }

        [HttpPost("AddItemToBasket/{basketId}")]
        public bool AddItemToBasket(int basketId, [FromBody] BasketItem item)
        {
            return _basketService.AddItemToBasket(basketId, item);
        }

        [HttpPost("RemoveItemFromBasket/{basketId}")]
        public bool RemoveItemFromBasket(int basketId, [FromBody] BasketItem item)
        {
            return _basketService.DeleteItemFromBasket(basketId, item);
        }

        [HttpDelete("ClearBasket/{basketId}")]
        public bool ClearBasket(int basketId)
        {
            return _basketService.ClearBasket(basketId);
        }
    }
}
