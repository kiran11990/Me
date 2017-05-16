using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class Slabase
    {
        public Slabase()
        {
            ServiceLevelPerformance = new HashSet<ServiceLevelPerformance>();
        }

		public int Id { get; set; }
		public int? SupplierId { get; set; }
		public string Scid { get; set; }
		public int? SoWid { get; set; }
		public string ApplicationGroup { get; set; }
		public int? CrestLevel1Id { get; set; }
		public int? CrestLevel2Id { get; set; }
		public int? ServiceCatalogId { get; set; }
		public int? ServiceClass { get; set; }
		public string SeverityLevel { get; set; }
		public string PriorityLevel { get; set; }
		public string Environment { get; set; }
		public bool? IsCustom { get; set; }
		public string ValidationNotes { get; set; }
		public string Remarks { get; set; }
		public string Pref { get; set; }
		public string Itorg { get; set; }

		public virtual ICollection<ServiceLevelPerformance> ServiceLevelPerformance { get; set; }
		public virtual CrestLevel1 CrestLevel1 { get; set; }
		public virtual CrestLevel2 CrestLevel2 { get; set; }
		public virtual ServiceCatalog ServiceCatalog { get; set; }
		public virtual SoW SoW { get; set; }
	}
}
