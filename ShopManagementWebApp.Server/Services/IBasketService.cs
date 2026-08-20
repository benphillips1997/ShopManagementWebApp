using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public interface IBasketService
    {
        Basket? GetBasket(int id);
        bool AddItemToBasket(int id, BasketItem item);
        bool DeleteItemFromBasket(int id, BasketItem item);
        bool ClearBasket(int id);
    }
}
