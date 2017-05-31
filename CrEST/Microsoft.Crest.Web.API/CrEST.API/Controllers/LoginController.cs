using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;
using CrEST.Models;
using System.Linq;
using CrEST.API;

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
        [Route("ValidateUsers/{UserName}/{Password}")]
        public IEnumerable<LoginData> ValidateUser(string UserName, string password)
        {
            return _loginRepository.ValidateUser(UserName, password);
        }
        [HttpPost]
        [Route("GetUsersRegistered/{UserName}/{Password}")]
        public IEnumerable<RegisterData>GetUsersRegistered(string Username,string Password)
        {
            return _loginRepository.GetUsersRegistered(Username,Password);
        }

    }

}