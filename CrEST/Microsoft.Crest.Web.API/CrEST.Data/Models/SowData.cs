using System;
using System.Collections.Generic;
using System.Text;

namespace CrEST.Models
{
    public class SowData
    {
        public int SoWid { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public int? Itorg { get; set; }
        public int? ItorgName { get; set; }
        public int? ContractId { get; set; }
        public DateTime? SoweffectiveDate { get; set; }
        public DateTime? SowexpirationDate { get; set; }
        public string Msowner { get; set; }
        public string InfyOwner { get; set; }
        public double? ServiceCatalogVersion { get; set; }
        public int? PonumYear1 { get; set; }
        public string Currency { get; set; }
        public decimal? SowamountYear1 { get; set; }
        public decimal? SowamountYear2 { get; set; }
        public decimal? SowamountYear3 { get; set; }
        public decimal? SowamountYear4 { get; set; }
        public bool? IsCrest { get; set; }
        public string Remarks { get; set; }
        public int? CompanyCode { get; set; }		
	}
}
