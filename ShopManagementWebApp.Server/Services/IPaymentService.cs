using ShopManagementWebApp.Server.Dtos;

namespace ShopManagementWebApp.Server.Services
{
    public interface IPaymentService
    {
        PaymentResponseDto ProcessPayment(PaymentRequestDto requestDetails);
    }
}
