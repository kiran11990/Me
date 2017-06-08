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

        public LoginController(CrESTContext context)
        {
            _loginRepository = new Loginrepository(context);
        }

        [HttpGet]
        [Route("ValidateUsers/{UserName}/{Password}")]
        public int ValidateUser(string UserName, string password)
        {
            return _loginRepository.ValidateUser(UserName, password);
        }
        [HttpPost]
        [Route("GetUsersRegistered/{UserName}/{Password}/{RoleName}")]
        public int GetUsersRegistered(string Username,string Password,string RoleName)
        {
            return _loginRepository.GetUsersRegistered(Username,Password,RoleName);
        }


        //[HttpGet]
        //[Route("GetUsersMetadata")]
        //public RegisterUser GetUsersMetadata()
        //{
        //    return _loginRepository.GetUsersMetadata();
        //}

    }

}