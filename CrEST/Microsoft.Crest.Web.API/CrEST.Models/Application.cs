using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class Application
    {
        public int ApplicationId { get; set; }
        public int? SoWid { get; set; }
        public string ServiceLine { get; set; }
        public string Application1 { get; set; }
        public int? ServiceClass { get; set; }
        public int? RunOrGrow { get; set; }
        public int? ApplicationGroup { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string ServiceLineChk { get; set; }
        public bool? EndToEnd { get; set; }
        public bool? Epm { get; set; }
        public string TM { get; set; }
        public string ManagedCapacity { get; set; }
        public string ManagedService { get; set; }
        public string ApplicationChk { get; set; }
        public string SoftwareAssetSearchableId { get; set; }
        public string Remarks { get; set; }

        public virtual Service ApplicationGroupNavigation { get; set; }
        public virtual SoW SoW { get; set; }
    }
}
