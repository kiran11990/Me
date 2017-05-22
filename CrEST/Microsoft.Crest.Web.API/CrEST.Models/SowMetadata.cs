using CrEST.Data.Models;
using System.Collections.Generic;

namespace CrEST.Models
{
    public class SowMetadata
    {
        public List<Supplier> Suppliers { get; set; }
        public List<Itorg> ItOrg { get; set; }
        public List<int> ContractIds { get; set; }
        public List<int> CompanyCodes { get; set; }
    }
}
