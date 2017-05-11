using System.Collections.Generic;
using Microsoft.Crest.Web.API.Models;
using Microsoft.Crest.Web.API.Data;
using System.Linq;
using System;


namespace Microsoft.Crest.Web.API.CrEST.BL
{
	public class SoWRepository : ISoWRepository
	{
		private readonly CrESTContext _context;

		public SoWRepository(CrESTContext context)
		{
			_context = context;
		}

		public IEnumerable<SoW> GetAll()
		{
			return _context.SoW.AsEnumerable();
		}

		public SoW Get(int item)
		{
			return _context.SoW.FirstOrDefault(s => s.SoWid == item);
		}

		public SoW Put(SoW item)
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
				//existingItem. = item.InfyOwner;
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

		public IEnumerable<SoW> FindSoW(int contractId, string ITOrg, DateTime expiryDate, string msOwner)
		{
			return _context.SoW.Where(s => s.ContractId == contractId && s.Itorg == ITOrg
								&& s.SowexpirationDate == expiryDate && s.Msowner == msOwner).AsEnumerable();		
		}

	}
}
