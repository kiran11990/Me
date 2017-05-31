using CrEST.Data.Models;
using System.Collections.Generic;

namespace CrEST.Models
{
	public class ServiceMetadataList
	{
		public List<SupplierMetadata> SupplierMetadata { get; set; }
		public List<int> ContractIds { get; set; }
		public List<CrestLevel1Metadata> CrestLevel1Metadata { get; set; }
		public List<CrestLevel2Metadata> CrestLevel2Metadata { get; set; }
		public List<CrestLevel3Metadata> CrestLevel3Metadata { get; set; }
		public List<ItorgMetadata> ItOrgMetadata { get; set; }
	}
}
