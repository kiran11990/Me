using System;
using System.Collections.Generic;
using System.Text;

namespace CrEST.Models
{
    public class ServiceData
    {
        public int ServiceId { get; set; }
        public string SupplierId { get; set; }
        public string Supplier { get; set; }
        public int ContractId { get; set; }
        public string ApplicationGroup { get; set; }
        public string CrestLevel1 { get; set; }
        public string CrestLevel2 { get; set; }
        public string CrestLevel3 { get; set; }
        public int CrestLevel1Id { get; set; }
        public int CrestLevel3Id { get; set; }
        public decimal? AppGroupServiceFeeY1 { get; set; }
        public decimal? AppGroupServiceFeeY2 { get; set; }
        public decimal? AppGroupServiceFeeY3 { get; set; }
        public decimal? AppGroupServiceFeeY4 { get; set; }
        public string ValidationNotes { get; set; }
        public string Remarks { get; set; }
        public string Scid { get; set; }
        public string Currency { get; set; }
        public string Itorg { get; set; }
    }
}
