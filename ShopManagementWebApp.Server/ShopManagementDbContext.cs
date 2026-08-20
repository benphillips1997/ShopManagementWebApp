using Microsoft.EntityFrameworkCore;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server
{
    public class ShopManagementDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Basket> Baskets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=BPC\\SQLEXPRESS;Initial Catalog=ShopManagement;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Application Name=\"SQL Server Management Studio\";Command Timeout=0");           
        }
    }
}
