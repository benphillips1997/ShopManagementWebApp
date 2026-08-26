using Microsoft.EntityFrameworkCore;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public class UserService : IUserService
    {
        private readonly ShopManagementDbContext _context;

        public UserService(ShopManagementDbContext context)
        {
            _context = context;
        }

        public UserLoginResponse Login(User user)
        {
            var foundUser = _context.Users.Include(u => u.Basket).ThenInclude(b => b.Items).ThenInclude(i => i.Product)
                .Include(u => u.Orders).FirstOrDefault(x => x.Email == user.Email);

            var response = new UserLoginResponse()
            {
                Success = true
            };

            if (foundUser == null)
            {
                response.Success = false;
                response.ErrorMessage = "User does not exist";

                return response;
            }

            if (foundUser.Password !=  user.Password)
            {
                response.Success = false;
                response.ErrorMessage = "Incorrect password";
            }

            response.User = foundUser;

            return response;
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User? GetUser(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        public bool AddUser(User user)
        {
            if (user == null) { return false; }

            if (user.Basket == null) { user.Basket = new Basket(); }

            if (_context.Users.FirstOrDefault(u => u.Email == user.Email) != null)
            {
                return false;
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return true;
        }

        public bool UpdateUser(User user)
        {
            if (user == null) { return false; }

            var userToUpdate = _context.Users.FirstOrDefault(x => x.Id == user.Id);

            if (userToUpdate == null) { return false; }

            userToUpdate.Email = user.Email;
            userToUpdate.Password = user.Password;
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Address = user.Address;
            userToUpdate.Country = user.Country;
            userToUpdate.Phone = user.Phone;

            _context.SaveChanges();

            return true;
        }

        public bool DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);

            if (user == null) { return false; }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return true;
        }
    }
}
