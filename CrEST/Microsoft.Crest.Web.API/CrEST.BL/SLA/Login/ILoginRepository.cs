using System;
using System.Collections.Generic;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
    public interface ILoginRepository
    {
        //IEnumerable<LoginData> GetUserNames(string UserName, string password);
        int  ValidateUser(string UserName, string Password);
        int GetUsersRegistered(string UserName,string Password,string RoleName);
        //IEnumerable<RegisterData> GetUsersMetadata();
    }
}
