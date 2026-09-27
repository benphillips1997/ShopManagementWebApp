using static ShopManagementWebApp.Server.Enums;

namespace ShopManagementWebApp.Server.Dtos
{
    public class UpdateInventoryDto
    {
        public int ProductId { get; set; }
        public int Amount { get; set; }
        public UpdateInventoryType UpdateType { get; set; } = UpdateInventoryType.Both;
    }
}
