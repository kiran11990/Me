using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class Service
    {
        public Service()
        {
            Application = new HashSet<Application>();
            Slabase = new HashSet<Slabase>();
        }

        public int ServiceId { get; set; }
        public int? SupplierId { get; set; }
        public int? SoWid { get; set; }
        public string ApplicationGroup { get; set; }
        public int? CrestLevel1 { get; set; }
        public int? CrestLevel2 { get; set; }
        public int? CrestLevel3 { get; set; }
        public decimal? AppGroupServiceFeeY1 { get; set; }
        public decimal? AppGroupServiceFeeY2 { get; set; }
        public decimal? AppGroupServiceFeeY3 { get; set; }
        public decimal? AppGroupServiceFeeY4 { get; set; }
        public string ValidationNotes { get; set; }
        public string Remarks { get; set; }

        public virtual ICollection<Application> Application { get; set; }
        public virtual ICollection<Slabase> Slabase { get; set; }
        public virtual CrestLevel1 CrestLevel1Navigation { get; set; }
        public virtual CrestLevel2 CrestLevel2Navigation { get; set; }
        public virtual CrestLevel3 CrestLevel3Navigation { get; set; }
        public virtual SoW SoW { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
