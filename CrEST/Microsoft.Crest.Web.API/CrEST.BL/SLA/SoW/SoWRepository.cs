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
		private readonly CrESTContext _context;

		public SoWRepository(CrESTContext context)
		{
			_context = context;
		}

		public IEnumerable<SowData> GetAll()
		{
			return SearchSow(0, string.Empty, null, null, string.Empty);
		}

		public SowData GetById(int item)
		{
			_context.Database.OpenConnection();
			DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
			cmd.CommandText = "spGetSoWById";
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.Add(new SqlParameter("@SoWId", item));

			SowData existingItem = new SowData();

			using (var reader = cmd.ExecuteReader())
			{
				while (reader.Read())
				{
					existingItem.SupplierName = reader.GetString(0);
					existingItem.Itorg = reader.GetInt32(1);
					existingItem.ContractId = reader.GetInt32(2);
					existingItem.SoweffectiveDate = reader.GetDateTime(3);
					existingItem.SowexpirationDate = reader.GetDateTime(4);
					existingItem.Msowner = reader.GetString(5);
					existingItem.ServiceCatalogVersion = reader.GetDouble(6);
					existingItem.PonumYear1 = reader.GetInt32(7);
					existingItem.Currency = reader.GetString(8);
					existingItem.SowamountYear1 = reader.IsDBNull(9) ? default(decimal) : reader.GetDecimal(9);
					existingItem.SowamountYear2 = reader.IsDBNull(10) ? default(decimal) : reader.GetDecimal(10);
					existingItem.SowamountYear3 = reader.IsDBNull(11) ? default(decimal) : reader.GetDecimal(11);
					existingItem.SowamountYear4 = reader.IsDBNull(12) ? default(decimal) : reader.GetDecimal(12);
					existingItem.IsCrest = reader.GetBoolean(13);
					existingItem.Remarks = reader.IsDBNull(14) ? string.Empty : reader.GetString(14);
					existingItem.CompanyCode = reader.GetInt32(15);
					existingItem.SoWid = reader.GetInt32(16);
					existingItem.InfyOwner = reader.IsDBNull(17) ? string.Empty : reader.GetString(17);
					existingItem.ItorgName = _context.Itorg.Where(s => s.ItorgId == reader.GetInt32(1)).FirstOrDefault().ItorgName;
					existingItem.SupplierId = reader.GetInt32(18);
				}
			}

			return existingItem;

		}

		public int SaveSOW(SowData item)
		{

			SoW sowItem = _context.SoW.Where(s => s.SoWid == item.SoWid).SingleOrDefault();

			if (sowItem == null)
			{
                sowItem = new SoW();
			}
            sowItem.SupplierId = _context.Supplier.Where(x => x.SupplierId == item.SupplierId).FirstOrDefault().SupplierId;
			sowItem.Itorg = item.Itorg;
			sowItem.ContractId = item.ContractId;
			sowItem.SoweffectiveDate = item.SoweffectiveDate;
			sowItem.SowexpirationDate = item.SowexpirationDate;
			sowItem.Msowner = item.Msowner;
			sowItem.InfyOwner = item.InfyOwner;
			sowItem.ServiceCatalogVersion = item.ServiceCatalogVersion;
			sowItem.PonumYear1 = item.PonumYear1;
			sowItem.SowamountYear1 = item.SowamountYear1;
			sowItem.SowamountYear2 = item.SowamountYear2;
			sowItem.SowamountYear3 = item.SowamountYear3;
			sowItem.SowamountYear4 = item.SowamountYear4;
			sowItem.IsCrest = item.IsCrest;
			sowItem.Remarks = item.Remarks;
			if (sowItem.SoWid == 0)
				_context.SoW.Add(sowItem);
            return _context.SaveChanges();

        }


		public IEnumerable<SowData> FindSoW(int contractId, string ITOrg, DateTime effectiveDate, DateTime expiryDate, string msOwner)
		{
			return SearchSow(contractId, ITOrg, effectiveDate, expiryDate, msOwner);
		}

		public SowMetadata GetSowMetadata()
		{

			SowMetadata sowMetadata = new SowMetadata();

			sowMetadata.Suppliers = _context.Supplier.ToList();
			sowMetadata.ItOrg = _context.Itorg.ToList();
			sowMetadata.ContractIds = _context.SoW.Where(x => x.ContractId != null).Select(x => x.ContractId.Value).Distinct().ToList();
			sowMetadata.CompanyCodes = _context.SoW.Where(x => x.CompanyCode != null).Select(x => x.CompanyCode.Value).ToList();

			return sowMetadata;

		}

		public IEnumerable<SowData> GetActiveContracts()
		{
			List<SowData> sows = new List<SowData>();

			
				_context.Database.OpenConnection();
				DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
				cmd.CommandText = "spGetActiveContracts";
				cmd.CommandType = CommandType.StoredProcedure;

				using (var reader = cmd.ExecuteReader())
				{
					while (reader.Read())
					{
						SowData sow = new SowData();
						sow.ContractId = reader.GetInt32(0);
						sow.InfyOwner = reader.IsDBNull(1) ? string.Empty : reader.GetString(1);
						sow.SoweffectiveDate = reader.GetDateTime(2);
						sow.SowexpirationDate = reader.GetDateTime(3);
						sows.Add(sow);
					}
				}
			
			return sows;
		}

		private IEnumerable<SowData> SearchSow(int contractId, string itOrg, DateTime? effectiveDate, DateTime? expiryDate, string infyOwner)
		{

            int id = 0;
            if (!String.IsNullOrWhiteSpace(itOrg)) {
                id = _context.Itorg.Where(x => x.ItorgName == itOrg).Select(x => x.ItorgId).Single();
            }
            

            List<SowData> sows = new List<SowData>();


			_context.Database.OpenConnection();
				DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
				cmd.CommandText = "spSearchSoW";
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.Add(new SqlParameter("@ContractId", contractId));
				cmd.Parameters.Add(new SqlParameter("@ITOrg", id));
				if (infyOwner == null)
					cmd.Parameters.Add(new SqlParameter("@InfyOwner", string.Empty));
				else
					cmd.Parameters.Add(new SqlParameter("@InfyOwner", infyOwner));
				if (effectiveDate == null || effectiveDate == new DateTime())
					cmd.Parameters.Add(new SqlParameter("@SOWEffectiveDate", string.Empty));
				else
					cmd.Parameters.Add(new SqlParameter("@SOWEffectiveDate", effectiveDate));
				if (expiryDate == null || expiryDate == new DateTime())
					cmd.Parameters.Add(new SqlParameter("@SOWExpirationDate", string.Empty));
				else
					cmd.Parameters.Add(new SqlParameter("@SOWExpirationDate", expiryDate));

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
						sow.Currency = reader.IsDBNull(8) ? string.Empty : reader.GetString(8);
						sow.SowamountYear1 = reader.IsDBNull(9) ? default(decimal) : reader.GetDecimal(9);
						sow.SowamountYear2 = reader.IsDBNull(10) ? default(decimal) : reader.GetDecimal(10);
						sow.SowamountYear3 = reader.IsDBNull(11) ? default(decimal) : reader.GetDecimal(11);
						sow.SowamountYear4 = reader.IsDBNull(12) ? default(decimal) : reader.GetDecimal(12);
						sow.IsCrest = reader.GetBoolean(13);
						sow.Remarks = reader.IsDBNull(14) ? string.Empty : reader.GetString(14);
						sow.CompanyCode = reader.IsDBNull(15) ? default(int) : reader.GetInt32(15);
						sow.SoWid = reader.IsDBNull(16) ? default(int) : reader.GetInt32(16);
						sow.InfyOwner = reader.IsDBNull(17) ? string.Empty : reader.GetString(17);
						sow.Itorg = reader.IsDBNull(18) ? default(int) : reader.GetInt32(18);
						sow.SupplierId = reader.IsDBNull(19) ? default(int) : reader.GetInt32(19);
						sows.Add(sow);
					}
				}
			

			return sows;
		}
	}
}

