using System.Collections.Generic;
using System.Linq;
using System;
using CrEST.Data.Models;
using CrEST.Models;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;



namespace CrEST.BL
{
    public class Loginrepository : ILoginRepository
    {
        //public IEnumerable<LoginData> GetUserNames(string UserName, string UserType)
        //{
        //    return GetUserNames(UserName, UserType);
        //}

        public int ValidateUser(string UserName,string Password)
        {
            int status=0;
            List<LoginData> users = new List<LoginData>();
            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spValidateUser";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                cmd.Parameters.Add(new SqlParameter("@Password", Password));  
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        LoginData rd = new LoginData();
                        status = reader.GetInt32 (0);
                        //rd.Password = reader.GetString(1);
                     
                    }

                    return status;
                }
            }

        }
        public IEnumerable<RegisterData> GetUsersRegistered(string UserName, string Password)
        {
            List<RegisterData> rd1 = new List<RegisterData>();
            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spInsertUsers";
                cmd.CommandType = CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        RegisterData rd = new RegisterData();
                        rd.UserName = reader.GetString(0);
                        rd1.Add(rd);
                    }

                    return rd1;
                }
            }
        }
        }
    }
