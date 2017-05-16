using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class CrestLevel3
    {
        public CrestLevel3()
        {
            ServiceNavigation = new HashSet<Service>();
        }

        public int Id { get; set; }
        public string Service { get; set; }
        public int CrestLevel2Id { get; set; }
        public string CrestServiceId { get; set; }
        public string Applicability { get; set; }
        public int? Maturity { get; set; }
        public int? OwnershipGuideline { get; set; }

        public virtual ICollection<Service> ServiceNavigation { get; set; }
        public virtual CrestLevel2 CrestLevel2 { get; set; }
    }
}
