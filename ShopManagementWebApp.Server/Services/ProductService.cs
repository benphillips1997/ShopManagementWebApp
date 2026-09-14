using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public class ProductService : IProductService
    {
        private readonly ShopManagementDbContext _context;

        public ProductService(ShopManagementDbContext context)
        {
            _context = context;
        }

        public List<Product> GetProducts()
        {
            return _context.Products.ToList();
        }

        public Product? GetProduct(int id)
        {
            return _context.Products.FirstOrDefault(x => x.Id == id);
        }

        public bool AddProduct(Product product)
        {
            if (product == null)
            {
                return false;
            }

            _context.Products.Add(product);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateProduct(UpdateProductDto product)
        {
            var productToUpdate = _context.Products.FirstOrDefault(x => x.Id == product.Id);

            if (productToUpdate == null) { return false; }

            if (product.Name != null)
            {
                productToUpdate.Name = product.Name;
            }

            if (product.Description != null)
            {
                productToUpdate.Description = product.Description;
            }

            if (product.Cost != null)
            {
                productToUpdate.Cost = product.Cost.Value;
            }

            if (product.ImageSource != null)
            {
                productToUpdate.ImageSource = product.ImageSource;
            }

            if (product.Stock != null)
            {
                productToUpdate.Stock = product.Stock.Value;
            }
            
            if (product.IsListed != null)
            {
                productToUpdate.IsListed = product.IsListed.Value;
            }

            _context.SaveChanges();

            return true;
        }

        public bool DeleteProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);

            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            _context.SaveChanges();

            return true;
        }
    }
}
