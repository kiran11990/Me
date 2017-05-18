using System;
using System.Collections.Generic;

namespace CrEST.Data.Models
{
    public partial class Itorg
    {
        public Itorg()
        {
            Application = new HashSet<Application>();
            Service = new HashSet<Service>();
            Slabase = new HashSet<Slabase>();
            SoW = new HashSet<SoW>();
        }

        public int ItorgId { get; set; }
        public string ItorgName { get; set; }

        public virtual ICollection<Application> Application { get; set; }
        public virtual ICollection<Service> Service { get; set; }
        public virtual ICollection<Slabase> Slabase { get; set; }
        public virtual ICollection<SoW> SoW { get; set; }
    }
}
