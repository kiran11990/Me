using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
    

namespace Notification
{
    class EmailDataAccess 
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        public DataSet GetEmaildetails()
        {
          
            DataSet ds = new DataSet();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
              
               
                SqlDataAdapter da = new SqlDataAdapter();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "spGetNotificationEmailDetails";
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                cmd.CommandTimeout = 0;
            
                da.Fill(ds);
               
             
            }
           

            return ds;

               
        }
    }
}
