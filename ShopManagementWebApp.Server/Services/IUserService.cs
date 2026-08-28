using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public interface IUserService
    {
        List<User> GetUsers();
        User? GetUser(int id);
        bool AddUser(User user);
        bool UpdateUser(UpdateUserRequest requestDetails);
        bool DeleteUser(int id);
        UserLoginResponse Login(LoginRequest request);
    }
}
