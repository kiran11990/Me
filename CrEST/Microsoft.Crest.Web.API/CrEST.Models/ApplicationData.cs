using System;
using System.Collections.Generic;
using System.Text;

namespace CrEST.Models
{
	public class ApplicationData
	{
		public int ApplicationId { get; set; }
		public int? SoWid { get; set; }
		public int ContractId { get; set; }
		public string ServiceLine { get; set; }
		public string Application { get; set; }
		public int? ServiceClass { get; set; }
		public int? RunOrGrow { get; set; }
		public string ApplicationGroup { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? EndDate { get; set; }
		public bool? EndToEnd { get; set; }
		public bool? Epm { get; set; }
		public string TM { get; set; }
		public string ManagedCapacity { get; set; }
		public string ManagedService { get; set; }
		public string SoftwareAssetSearchableId { get; set; }
		public string Remarks { get; set; }
		public int? SupplierId { get; set; }
		public string SupplierName { get; set; }
		public string OwnerAlias { get; set; }
		public int? Itorg { get; set; }
		public string ITOrgName { get; set; }
		public string ServiceClassName { get; set; }
		public string RunOrGrowName { get; set; }

	}
}
