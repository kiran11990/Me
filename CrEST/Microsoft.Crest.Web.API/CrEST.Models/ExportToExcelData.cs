using System;
using System.Collections.Generic;
using System.Text;

namespace CrEST.Models
{
    public class ExportToExcelData
    {
        public IEnumerable<SowData> Sows { get; set; }
        public IEnumerable<ServiceData> Services { get; set; }
        public IEnumerable<ApplicationData> Applications { get; set; }
        public IEnumerable<SLAData> Slps { get; set; }
    }
}
