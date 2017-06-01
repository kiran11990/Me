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
                        //rd.Password = reader.GetString(1)
                    }
                    return status;
                }
            }
        }
        public int GetUsersRegistered(string UserName, string Password, string RoleName)
        {
            int status = 0;

            using (CrESTContext db = new CrESTContext())
            {
                //RegisterData rd = new RegisterData();
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spInsertUser";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                cmd.Parameters.Add(new SqlParameter("@Password", Password));
                cmd.Parameters.Add(new SqlParameter("@Rolename", RoleName));
                using (var reader = cmd.ExecuteReader())
                {
                    
                        while (reader.Read())
                        {
                        RegisterData rd1 = new RegisterData();
                            UserName = reader.GetString(0);
                            Password = reader.GetString(1);
                            RoleName = reader.GetString(2);
                            //status.Add(rd1);
                        }
                     
                    }
                return status;
                
        }
        }
       }
    }
