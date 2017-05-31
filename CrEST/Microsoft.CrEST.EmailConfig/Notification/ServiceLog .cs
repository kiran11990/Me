using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;
using System.Net.Mail;
using System.Net;
using System.Diagnostics;

namespace Notification
{
    class ServiceLog
    {


        /// <summary>   
        /// This function write log to LogFile.text when some error occurs.   
        /// </summary>   
        /// <param name="ex"></param>   
        public static void WriteErrorLog(Exception ex)
        {
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "\\LogFile.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + ex.Source.ToString().Trim() + "; " + ex.Message.ToString().Trim());
                sw.Flush();
                sw.Close();
            }
            catch
            {
            }
        }
        /// <summary>   
        /// this function write Message to log file.   
        /// </summary>   
        /// <param name="Message"></param>   
        public static void WriteErrorLog(string Message)
        {
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "\\LogFile.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + Message);
                sw.Flush();
                sw.Close();
            }
            catch
            {
            }
        }

        public static void SendEmail(String ToEmail, string cc, string bcc, String Subj, string Message)
        {
            //Reading sender Email credential from web.config file   
          
            string HostAdd = ConfigurationManager.AppSettings["Host"].ToString();
            string FromEmailid = ConfigurationManager.AppSettings["FromMail"].ToString();
            string Pass = ConfigurationManager.AppSettings["Password"].ToString();
            int port = Convert.ToInt32(ConfigurationManager.AppSettings["port"]);
            
             MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient(HostAdd);
            SmtpServer.UseDefaultCredentials = false;
            mail.From = new MailAddress(FromEmailid);
            mail.To.Add(ToEmail);
            mail.CC.Add(cc);
            mail.Subject = Subj;
            mail.Body += Message;
            mail.IsBodyHtml = true;
            SmtpServer.Port = port;
            SmtpServer.Credentials = new System.Net.NetworkCredential(FromEmailid, Pass);
            SmtpServer.EnableSsl = true;
             SmtpServer.Send(mail);
           
             
        }


    }
}
