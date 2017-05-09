using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class ServiceLevelPerformance
    {
        public int Id { get; set; }
        public int? SlabaseId { get; set; }
        public string ReportingPeriod { get; set; }
        public string Value { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public virtual Slabase Slabase { get; set; }
    }
}
