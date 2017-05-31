using System;
using Notification;

using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
       
        public void TestMethod1()
        {
            EmailService ob = new EmailService();
            ob.MainProcess();


        }
    }
}
