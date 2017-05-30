using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;
using CrEST.Models;
using System.Linq;

namespace Microsoft.Crest.Web.API.Controllers
{

    [Route("api/[controller]")]

    public class LoginController : Controller
    {
        private readonly ILoginRepository _loginRepository;

        public LoginController()
        {
            _loginRepository = new Loginrepository();
        }

        [HttpGet]
        [Route("GetUserNames/{name}/{password}")]
        public IEnumerable<LoginData> GetAllUsers(string UserName, string password)
        {
            return _loginRepository.GetUserNames(UserName, password);
        }
        [Route("GetUsers")]
        public IEnumerable<RegisterData>GetUsersRegistered(string Username,string UserType)
        {
            return _loginRepository.GetUsersRegistered(Username,UserType);
        }

    }

}