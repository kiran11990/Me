﻿using System.Collections.Generic;
using CrEST.Models;
using CrEST.Data;
using System.Linq;
using System;

namespace CrEST.BL
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
				existingItem.ITOrg = item.ITOrg;
				existingItem.ContractId = item.ContractId;
				existingItem.SOWEffectiveDate = item.SOWEffectiveDate;
				existingItem.SOWExpirationDate = item.SOWExpirationDate;
				existingItem.Msowner = item.Msowner;				
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

		public IEnumerable<SoW> FindSoW(int contractId, string itOrg, DateTime expiryDate, string msOwner)
		{
			return _context.SoW.Where(s => s.ContractId == contractId && s.ITOrg == itOrg
								&& s.SOWExpirationDate == expiryDate && s.Msowner == msOwner).AsEnumerable();		
		}

	}
}
