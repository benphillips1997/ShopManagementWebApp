using ShopManagementWebApp.Server.Dtos;

namespace ShopManagementWebApp.Server.Services.Interfaces
{
    public interface IPaymentService
    {
        ProcessOrderResponseDto ProcessPayment(ProcessOrderRequestDto requestDetails);
    }
}
