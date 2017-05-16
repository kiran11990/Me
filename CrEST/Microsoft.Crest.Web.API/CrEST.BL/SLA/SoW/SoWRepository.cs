using System.Collections.Generic;
using System.Linq;
using System;
using CrEST.Data.Models;
using CrEST.Models;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace CrEST.BL
{
    public class SoWRepository : ISoWRepository
    {
        public IEnumerable<SowData> GetAll()
        {
            return SearchSow(0, 0, string.Empty);
        }

        public SoW Get(int item)
        {
            using (CrESTContext _context = new CrESTContext())
            {
                return _context.SoW.FirstOrDefault(s => s.SoWid == item);
            }
        }

        public SoW Put(SoW item)
        {
            using (CrESTContext _context = new CrESTContext())
            {
                if (item == null)
                {
                    return item;
                }

                SoW existingItem = _context.SoW.FirstOrDefault(s => s.SoWid == item.SoWid);
                if (existingItem != null)
                {
                    existingItem.SupplierId = item.SupplierId;
                    existingItem.Itorg = item.Itorg;
                    existingItem.ContractId = item.ContractId;
                    existingItem.SoweffectiveDate = item.SoweffectiveDate;
                    existingItem.SowexpirationDate = item.SowexpirationDate;
                    existingItem.Msowner = item.Msowner;
                    existingItem.InfyOwner = item.InfyOwner;
                    existingItem.ServiceCatalogVersion = item.ServiceCatalogVersion;
                    existingItem.PonumYear1 = item.PonumYear1;
                    existingItem.SowamountYear1 = item.SowamountYear1;
                    existingItem.SowamountYear2 = item.SowamountYear2;
                    existingItem.SowamountYear3 = item.SowamountYear3;
                    existingItem.SowamountYear4 = item.SowamountYear4;
                    existingItem.IsCrest = item.IsCrest;
                    existingItem.Remarks = item.Remarks;
                    _context.SoW.Update(existingItem);
                    item = existingItem;
                }
                else
                {
                    _context.SoW.Add(item);
                }

                _context.SaveChanges();
                return item;
            }
        }

        public IEnumerable<SowData> FindSoW(int contractId, int ITOrg, DateTime expiryDate, string msOwner)
        {
            return SearchSow(contractId, ITOrg, msOwner);
        }

        public SowMetadata GetSowMetadata()
        {
            using (CrESTContext _context = new CrESTContext())
            {
                SowMetadata sowMetadata = new SowMetadata();

                sowMetadata.Suppliers = _context.Supplier.ToList();
                sowMetadata.ItOrg = _context.Itorg.ToList();
                sowMetadata.ContractIds = _context.SoW.Where(x => x.ContractId != null).Select(x => x.ContractId.Value).Distinct().ToList();
                sowMetadata.CompanyCodes = _context.SoW.Where(x => x.CompanyCode != null).Select(x => x.CompanyCode.Value).ToList();

                return sowMetadata;
            }
        }

        public IEnumerable<SowData> GetActiveContracts()
        {
            List<SowData> sows = new List<SowData>();

            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spGetActiveContracts";
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        SowData sow = new SowData();
                        sow.ContractId = reader.GetInt32(0);
                        sow.InfyOwner = reader.IsDBNull(1)? string.Empty : reader.GetString(1);
                        sow.SoweffectiveDate = reader.GetDateTime(2);
                        sow.SowexpirationDate = reader.GetDateTime(3);
                        sows.Add(sow);
                    }
                }
            }
            return sows;
        }

        private IEnumerable<SowData> SearchSow(int contractId, int itOrg, string msOwner)
        {
            List<SowData> sows = new List<SowData>();

            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spSearchSoW";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@ContractId", contractId));
                cmd.Parameters.Add(new SqlParameter("@ITOrg", itOrg));
                cmd.Parameters.Add(new SqlParameter("@MSOwner", msOwner));
                cmd.Parameters.Add(new SqlParameter("@SOWEffectiveDate", string.Empty));
                cmd.Parameters.Add(new SqlParameter("@SOWExpirationDate", string.Empty));

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        SowData sow = new SowData();
                        sow.SupplierName = reader.GetString(0);
                        sow.ItorgName = reader.GetString(1);
                        sow.ContractId = reader.GetInt32(2);
                        sow.SoweffectiveDate = reader.GetDateTime(3);
                        sow.SowexpirationDate = reader.GetDateTime(4);
                        sow.Msowner = reader.GetString(5);
                        sow.ServiceCatalogVersion = reader.GetDouble(6);
                        sow.PonumYear1 = reader.GetInt32(7);
                        sow.Currency = reader.GetString(8);
                        sow.SowamountYear1 = reader.IsDBNull(9) ? default(decimal) : reader.GetDecimal(9);
                        sow.SowamountYear2 = reader.IsDBNull(10) ? default(decimal) : reader.GetDecimal(10);
                        sow.SowamountYear3 = reader.IsDBNull(11) ? default(decimal) : reader.GetDecimal(11);
                        sow.SowamountYear4 = reader.IsDBNull(12) ? default(decimal) : reader.GetDecimal(12);
                        sow.IsCrest = reader.GetBoolean(13);
                        sow.Remarks = reader.IsDBNull(14) ? string.Empty : reader.GetString(14);
                        sow.CompanyCode = reader.GetInt32(15);
                        sow.SoWid = reader.GetInt32(16);
                        sow.InfyOwner = reader.IsDBNull(17) ? string.Empty : reader.GetString(17);
                        sows.Add(sow);
                    }
                }
            }

            return sows;
        }
    }
}

