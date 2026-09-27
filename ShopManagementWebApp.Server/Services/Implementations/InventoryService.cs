using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Services.Interfaces;
using static ShopManagementWebApp.Server.Enums;

namespace ShopManagementWebApp.Server.Services.Implementations
{
    public class InventoryService : IInventoryService
    {
        private readonly ShopManagementDbContext _context;

        public InventoryService(ShopManagementDbContext context)
        {
            _context = context;
        }

        public bool UpdateInventory(UpdateInventoryDto requestDetails)
        {
            var inventoryItem = _context.Inventory.FirstOrDefault(i => i.ProductId == requestDetails.ProductId);

            if (inventoryItem == null || inventoryItem.Quantity - inventoryItem.AmountReserved < Math.Max(requestDetails.Amount, 0))
            {
                return false;
            }
            
            switch (requestDetails.UpdateType)
            {
                case UpdateInventoryType.QuantityOnly:
                    inventoryItem.Quantity -= requestDetails.Amount;
                    break;
                case UpdateInventoryType.ReservedOnly:
                    inventoryItem.AmountReserved += requestDetails.Amount;
                    break;
                case UpdateInventoryType.Both:
                    inventoryItem.Quantity -= requestDetails.Amount;
                    inventoryItem.AmountReserved -= requestDetails.Amount;
                    break;
                default:
                    Console.WriteLine("No invetory update type set");
                    break;
            }

            _context.SaveChanges();

            return true;
        }
    }
}
