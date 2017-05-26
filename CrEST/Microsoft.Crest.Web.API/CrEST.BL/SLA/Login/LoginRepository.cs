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
    public class Loginrepository :ILoginRepository
    {
        public IEnumerable<LoginData> GetUserNames(string UserName, string UserType)
        {
            return GetUserNames(UserName, UserType);
        }

        public IEnumerable<LoginData> GetAllUsers()
        {
            
            List<LoginData> users = new List<LoginData>();


            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                SqlCommand cmd = new SqlCommand("select UserName,RoleName from Users");

                // 2. Call Execute reader to get query results
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    // get the results of each column
                    string UserName = (string)rdr["UserName"];
                    string RoleName = (string)rdr["RoleName"];
                }
                return users;
            }

        }
        public IEnumerable<RegisterData>GetUsersRegistered(string UserName,string UserType)
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
