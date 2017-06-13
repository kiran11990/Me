using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using System.Configuration;
using System.Data.SqlClient;
using System.Timers;




namespace Notification
{
    public partial class EmailService : ServiceBase 
    {
      
        Thread mainThread;
       
        
        private System.Diagnostics.EventLog eventLogEmailService;
        public EmailService()
        {
           
            InitializeComponent();
          

            
            eventLogEmailService = new System.Diagnostics.EventLog();
            if (!System.Diagnostics.EventLog.SourceExists("EmailService"))
            {
                System.Diagnostics.EventLog.CreateEventSource(
                    "EmailService", "EmailServiceNewLog");
            }
            eventLogEmailService.Source = "EmailService";
            eventLogEmailService.Log = "EmailServiceNewLog";
            eventLogEmailService.WriteEntry("Crest: Email Service InitializeComponent  " + DateTime.Now);
        }

        protected override void OnStart(string[] args)
        {

             mainThread = new Thread(MainProcess);
            mainThread.Start();
            eventLogEmailService.WriteEntry("Crest: Email Service start " +DateTime.Now);




        }

        protected override void OnStop()
        {
            mainThread.Abort();
            eventLogEmailService.WriteEntry("Crest: Email service stopped" + DateTime.Now);
        }



     public   void MainProcess()
        {
                     
            double duration=Convert.ToDouble(ConfigurationManager.AppSettings["Duration"]);
            string InfyOwnerlist = "", InfyOwnerDMlist="",cclist="", Msg="", Sub="";
            eventLogEmailService.WriteEntry("Crest: Email Main Process start" + DateTime.Now);
            DataSet ds = new DataSet();
                try
                {
                    while (true)
                    {
                   
                                                                          
                        EmailDataAccess ob = new EmailDataAccess();
                        ds = ob.GetEmaildetails();
                   
                        if (ds.Tables.Count == 1)
                        {
                        
                            InfyOwnerlist = (ds.Tables[0].Rows[0]["InfyOwner"].Equals(DBNull.Value)) ? "" : ds.Tables[0].Rows[0]["InfyOwner"].ToString();
                            InfyOwnerDMlist = (ds.Tables[0].Rows[0]["InfyOwnerDM"].Equals(DBNull.Value)) ? "" : ds.Tables[0].Rows[0]["InfyOwnerDM"].ToString();
                            cclist = (ds.Tables[0].Rows[0]["cclist"].Equals(DBNull.Value)) ? "" : ds.Tables[0].Rows[0]["cclist"].ToString();
                            Msg = (ds.Tables[0].Rows[0]["MSG"].Equals(DBNull.Value)) ? "" : ds.Tables[0].Rows[0]["MSG"].ToString();
                            Sub = (ds.Tables[0].Rows[0]["SUB"].Equals(DBNull.Value)) ? "" : ds.Tables[0].Rows[0]["SUB"].ToString();

                            if (InfyOwnerlist != "")
                            {
                                ServiceLog.SendEmail(InfyOwnerlist + "," + InfyOwnerDMlist, cclist, "", Sub, Msg);
                                eventLogEmailService.WriteEntry("Crest: Mail sent sucessfully  " + DateTime.Now + "");
                            }
                            else
                            {
                                eventLogEmailService.WriteEntry(" Crest: Today  no records to sent a mail  " + DateTime.Now + "");
                            }

                        }
                    

                        Thread.Sleep(TimeSpan.FromHours(duration));
                    }
                }


                catch (Exception ex)
                {
                    eventLogEmailService.WriteEntry(" Crest Exception " + DateTime.Now + "" + ex);
                         mainThread.Abort();

                }
            
        }





  

        public void test()
        {
          //  timer1.Elapsed += new ElapsedEventHandler(ServiceTimer_Tick);
        }


    }
}
