using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class CrestLevel2
    {
        public CrestLevel2()
        {
            CrestLevel3 = new HashSet<CrestLevel3>();
            ServiceNavigation = new HashSet<Service>();
            ServiceCatalog = new HashSet<ServiceCatalog>();
            Slabase = new HashSet<Slabase>();
        }

        public int Id { get; set; }
        public string Service { get; set; }
        public int CrestLevel1Id { get; set; }
        public string CrestServiceId { get; set; }

        public virtual ICollection<CrestLevel3> CrestLevel3 { get; set; }
        public virtual ICollection<Service> ServiceNavigation { get; set; }
        public virtual ICollection<ServiceCatalog> ServiceCatalog { get; set; }
        public virtual ICollection<Slabase> Slabase { get; set; }
        public virtual CrestLevel1 CrestLevel1 { get; set; }
    }
}
