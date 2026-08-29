using ShopManagementWebApp.Server.Dtos;

namespace ShopManagementWebApp.Server.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ShopManagementDbContext _context;

        public PaymentService(ShopManagementDbContext context)
        {
            _context = context;
        }

        public PaymentResponseDto ProcessPayment(PaymentRequestDto paymentRequest)
        {
            var response = new PaymentResponseDto();

            return response;
        }
    }
}
