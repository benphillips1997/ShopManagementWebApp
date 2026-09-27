using Microsoft.EntityFrameworkCore;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services.Interfaces;
using static ShopManagementWebApp.Server.Enums;

namespace ShopManagementWebApp.Server.Services.Implementations
{
    public class BasketService : IBasketService
    {
        private readonly ShopManagementDbContext _context;
        private readonly IInventoryService _inventoryService;

        public BasketService(ShopManagementDbContext context, IInventoryService inventoryService)
        {
            _context = context;
            _inventoryService = inventoryService;
        }

        public Basket? GetBasket(int userId)
        {
            var basket = _context.Baskets.Include(b => b.Items).ThenInclude(i => i.Product).FirstOrDefault(x => x.UserId == userId);

            return basket;
        }

        public bool AddItemToBasket(int basketId, BasketItem item)
        {
            var basketToUpdate = _context.Baskets.Include(b => b.Items).ThenInclude(i => i.Product).FirstOrDefault(x => x.Id == basketId);

            if (basketToUpdate == null)
            { 
                return false;
            }

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

            var updateInventoryReq = new UpdateInventoryDto
            {
                ProductId = item.Product.Id,
                Amount = item.Count,
                UpdateType = UpdateInventoryType.ReservedOnly
            };
            _inventoryService.UpdateInventory(updateInventoryReq);

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

            var updateInventoryReq = new UpdateInventoryDto
            {
                ProductId = item.Product.Id,
                Amount = -1,
                UpdateType = UpdateInventoryType.ReservedOnly
            };
            _inventoryService.UpdateInventory(updateInventoryReq);

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
