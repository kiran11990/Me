using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class CrestLevel1
    {
        public CrestLevel1()
        {
            CrestLevel2 = new HashSet<CrestLevel2>();
            ServiceNavigation = new HashSet<Service>();
            ServiceCatalog = new HashSet<ServiceCatalog>();
            Slabase = new HashSet<Slabase>();
        }

        public int Id { get; set; }
        public string Service { get; set; }
        public bool IsRun { get; set; }
        public string CrestServiceId { get; set; }

        public virtual ICollection<CrestLevel2> CrestLevel2 { get; set; }
        public virtual ICollection<Service> ServiceNavigation { get; set; }
        public virtual ICollection<ServiceCatalog> ServiceCatalog { get; set; }
        public virtual ICollection<Slabase> Slabase { get; set; }
    }
}
