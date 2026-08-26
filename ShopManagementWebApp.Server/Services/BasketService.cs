using Microsoft.EntityFrameworkCore;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public class BasketService : IBasketService
    {
        private readonly ShopManagementDbContext _context;

        public BasketService(ShopManagementDbContext context)
        {
            _context = context;
        }

        public Basket? GetBasket(int userId)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);

            if (user == null) { return null; }

            var basket = _context.Baskets.FirstOrDefault(x => x.Id == user.Basket.Id);

            return basket;
        }

        public bool AddItemToBasket(int basketId, BasketItem item)
        {
            var basketToUpdate = _context.Baskets.Include(b => b.Items).ThenInclude(i => i.Product).FirstOrDefault(x => x.Id == basketId);

            if (basketToUpdate == null) { return false; }

            var existingItem = basketToUpdate.Items.FirstOrDefault(x => x.Product.Id == item.Product.Id);

            if (existingItem == null)
            {
                basketToUpdate.Items.Add(item);
            }
            else
            {
                int index = basketToUpdate.Items.IndexOf(existingItem);
                basketToUpdate.Items[index].Count += item.Count;
            }

            _context.SaveChanges();

            return true;
        }

        public bool DeleteItemFromBasket(int basketId, BasketItem item)
        {
            if (item == null) { return false; }

            var basketToUpdate = _context.Baskets.Include(b => b.Items).ThenInclude(i => i.Product).FirstOrDefault(x => x.Id == basketId);

            if (basketToUpdate == null) { return false; }

            var existingItem = basketToUpdate.Items.FirstOrDefault(x => x.Product.Id == item.Product.Id);

            if (existingItem == null)
            {
                return false;
            }

            int index = basketToUpdate.Items.IndexOf(existingItem);
            bool success = true;

            if (existingItem.Count > 1)
            {                
                basketToUpdate.Items[index].Count -= 1;
            }
            else
            {
                success = basketToUpdate.Items.Remove(existingItem);
                if (success)
                {
                    _context.Remove(existingItem);
                }
            }            

            _context.SaveChanges();

            return success;
        }

        public bool ClearBasket(int basketId)
        {
            var basketToUpdate = _context.Baskets.FirstOrDefault(x => x.Id == basketId);

            if (basketToUpdate == null) { return false; }

            basketToUpdate.Items = new List<BasketItem>();

            _context.SaveChanges();

            return true;
        }
    }
}
