using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public interface IUserService
    {
        List<User> GetUsers();
        User? GetUser(int id);
        bool AddUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(int id);
        UserLoginResponse Login(User user);
    }
}
