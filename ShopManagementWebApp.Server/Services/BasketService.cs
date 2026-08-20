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

        public Basket? GetBasket(int id)
        {
            return _context.Baskets.FirstOrDefault(x => x.Id == id);
        }

        public bool AddItemToBasket(int id, BasketItem item)
        {
            if (item == null) { return false; }

            var basketToUpdate = _context.Baskets.FirstOrDefault(x => x.Id == id);

            if (basketToUpdate == null) { return false; }

            basketToUpdate.Items.Add(item);

            _context.SaveChanges();

            return true;
        }

        public bool DeleteItemFromBasket(int id, BasketItem item)
        {
            if (item == null) { return false; }

            var basketToUpdate = _context.Baskets.FirstOrDefault(x => x.Id == id);

            if (basketToUpdate == null) { return false; }

            bool success = basketToUpdate.Items.Remove(item);

            _context.SaveChanges();

            return success;
        }

        public bool ClearBasket(int id)
        {
            var basketToUpdate = _context.Baskets.FirstOrDefault(x => x.Id == id);

            if (basketToUpdate == null) { return false; }

            basketToUpdate.Items = new List<BasketItem>();

            _context.SaveChanges();

            return true;
        }
    }
}
