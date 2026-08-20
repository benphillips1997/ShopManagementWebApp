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

        public bool UpdateProduct(Product product)
        {
            if (product == null) { return false; }

            var productToUpdate = _context.Products.FirstOrDefault(x => x.Id == product.Id);

            if (productToUpdate == null) { return false; }

            productToUpdate.Name = product.Name;
            productToUpdate.Description = product.Description;
            productToUpdate.Cost = product.Cost;
            productToUpdate.ImageSource = product.ImageSource;
            productToUpdate.Stock = product.Stock;

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
