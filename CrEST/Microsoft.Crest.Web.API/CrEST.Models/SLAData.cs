using System;
using System.Collections.Generic;
using System.Text;

namespace CrEST.Models
{
    public class SLAData    
    {
        public Guid Id { get; set; }
        public int? SlabaseId { get; set; }
        public string ReportingPeriod { get; set; }
        public string Pref { get; set; }
        public string Value { get; set; }
        public string ValueRemarks { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public string SupplierName { get; set; }
        public string SCID { get; set; }
        public int? ContractId { get; set; }
        public string ApplicationGroup { get; set; }
        public string CrestLevel1 { get; set; }
        public string CrestLevel2 { get; set; }
        public string SLAId { get; set; }
        public string ServiceMetric { get; set; }
        public string ServiceClass { get; set; }
        public string SeverityLevel { get; set; }
        public string PriorityLevel { get; set; }
        public string Environment { get; set; }
        public bool IsCustom { get; set; }
        public string MinimumLevel { get; set; }
        public string TargetLevel { get; set; }
        public string Weightage { get; set; }
        public string Remarks { get; set; }
        public string ValidationNotes { get; set; }
        public string Type { get; set; }
        public int? Chk { get; set; }
        public string InfyOwner { get; set; }
    }
}
