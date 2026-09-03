using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using Stripe;
using Stripe.Checkout;

namespace ShopManagementWebApp.Server.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly StripeSettings _stripeSettings;

        public PaymentService(Microsoft.Extensions.Options.IOptions<StripeSettings> stripeOptions)
        {
            _stripeSettings = stripeOptions.Value;
        }

        public ProcessOrderResponseDto ProcessPayment(ProcessOrderRequestDto paymentRequest)
        {
            var response = new ProcessOrderResponseDto();

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string>
                {
                    "card"
                },
                LineItems = new List<SessionLineItemOptions>(),
                Mode = "payment"
            };

            foreach (var item in paymentRequest.Order.Items)
            {
                var lineItem = new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long)(item.CostAtPurchase * 100), // Convert to pennies/cents
                        Currency = paymentRequest.Currency,
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.Product.Name,
                            Description = item.Product.Description
                        },
                    },
                    Quantity = item.Count  
                };
                options.LineItems.Add(lineItem);
            }

            try
            {
                var service = new SessionService();
                Session session = service.Create(options);
                response.Success = true;
            }
            catch (StripeException error)
            {
                response.Success = false;
                response.ErrorMessage = error.Message;                
            }

            return response;
        }
    }
}
