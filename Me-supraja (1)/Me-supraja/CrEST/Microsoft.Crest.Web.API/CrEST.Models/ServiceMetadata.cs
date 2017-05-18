using CrEST.Data.Models;
using System.Collections.Generic;

namespace CrEST.Models
{
    public class ServiceMetadata
    {
        public List<Supplier> Suppliers { get; set; }
        public List<int> ContractIds { get; set; }
        public List<CrestLevel1> CrestLevel1s { get; set; }
        public List<CrestLevel2> CrestLevel2s { get; set; }
        public List<CrestLevel3> CrestLevel3s { get; set; }
        public List<Itorg> ItOrg { get; set; }
    }
}
