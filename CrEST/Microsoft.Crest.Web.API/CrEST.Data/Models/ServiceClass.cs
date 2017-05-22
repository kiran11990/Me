using System;
using System.Collections.Generic;

namespace CrEST.Data.Models
{
    public partial class ServiceClass
    {
        public ServiceClass()
        {
            Application = new HashSet<Application>();
            Slabase = new HashSet<Slabase>();
        }

        public int Id { get; set; }
        public string ServiceClassName { get; set; }

        public virtual ICollection<Application> Application { get; set; }
        public virtual ICollection<Slabase> Slabase { get; set; }
    }
}
