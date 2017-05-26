using System;
using System.Collections.Generic;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
    public interface ILoginRepository
    {
        IEnumerable<LoginData> GetUserNames(string UserName, string password);
        IEnumerable<LoginData> GetAllUsers();
        IEnumerable<RegisterData> GetUsersRegistered(string UserName,string UserType);
    }
}
