using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public interface IProductService
    {
        List<Product> GetProducts();
        Product? GetProduct(int id);
        bool AddProduct(Product product);
        bool UpdateProduct(Product product);
        bool DeleteProduct(int id);
    }
}
