using System;
using System.Collections.Generic;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
    public interface ILoginRepository
    {
        IEnumerable<LoginData> GetUserNames(string UserName, string password);
        IEnumerable<LoginData> ValidateUser(string UserName, string Password, string UserType);
        IEnumerable<RegisterData> GetUsersRegistered(string UserName,string UserType);
    }
}
