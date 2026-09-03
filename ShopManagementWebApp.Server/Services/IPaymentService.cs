using ShopManagementWebApp.Server.Dtos;

namespace ShopManagementWebApp.Server.Services
{
    public interface IPaymentService
    {
        ProcessOrderResponseDto ProcessPayment(ProcessOrderRequestDto requestDetails);
    }
}
