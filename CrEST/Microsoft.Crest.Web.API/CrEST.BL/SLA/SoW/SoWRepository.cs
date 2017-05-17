﻿using System.Collections.Generic;
using System.Linq;
using System;
using CrEST.Data.Models;
using CrEST.Models;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CrEST.BL
{
    public class SoWRepository : ISoWRepository
    {
        public IEnumerable<SoW> GetAll()
        {
            using (CrESTContext _context = new CrESTContext())
            {
                return _context.SoW.AsEnumerable();
            }
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

        public IEnumerable<SoW> FindSoW(int contractId, int ITOrg, DateTime expiryDate, string msOwner)
        {
            using (CrESTContext _context = new CrESTContext())
            {
                return _context.SoW.Where(s => s.ContractId == contractId && s.Itorg == ITOrg
                                && s.SowexpirationDate == expiryDate && s.Msowner == msOwner).AsEnumerable();
            }
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

    }
}

