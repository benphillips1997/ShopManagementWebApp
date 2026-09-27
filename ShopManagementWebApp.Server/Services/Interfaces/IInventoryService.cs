using ShopManagementWebApp.Server.Dtos;

namespace ShopManagementWebApp.Server.Services.Interfaces
{
    public interface IInventoryService
    {
        bool UpdateInventory(UpdateInventoryDto requestDetails);
    }
}
