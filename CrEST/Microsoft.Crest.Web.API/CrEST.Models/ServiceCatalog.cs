using System;
using System.Collections.Generic;

namespace CrEST.Models
{
    public partial class ServiceCatalog
    {
        public ServiceCatalog()
        {
            Slabase = new HashSet<Slabase>();
        }

        public int Id { get; set; }
        public string Slaid { get; set; }
        public int CrestL1id { get; set; }
        public int? CrestL2id { get; set; }
        public string ServiceMetric { get; set; }
        public string ServiceMetricClass { get; set; }
        public string MinimumSl { get; set; }
        public string TargetSl { get; set; }
        public string ServiceClass { get; set; }
        public string Type { get; set; }
        public string Source { get; set; }
        public string MeasurementUnit { get; set; }
        public string MeasurementWindow { get; set; }
        public string Weightage { get; set; }
        public bool? ContinuousImprovement { get; set; }
        public bool? IsCustom { get; set; }

        public virtual ICollection<Slabase> Slabase { get; set; }
        public virtual CrestLevel1 CrestL1 { get; set; }
        public virtual CrestLevel2 CrestL2 { get; set; }
    }
}
