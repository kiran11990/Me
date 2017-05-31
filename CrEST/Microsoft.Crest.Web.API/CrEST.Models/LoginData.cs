using System;
using System.Collections.Generic;
using System.Text;

namespace CrEST.Models
{
   public class LoginData
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    public class RegisterData
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string RoleName { get; set; }

    }
}
