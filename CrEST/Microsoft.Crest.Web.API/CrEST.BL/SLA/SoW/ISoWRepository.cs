using System.Collections.Generic;
using System;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
	public interface ISoWRepository
	{
		IEnumerable<SowData> GetAll();

		SowData GetById(int item);

		int SaveSOW(SowData item);

        IEnumerable<SowData> FindSoW(int contractId, string ITOrg, DateTime effectiveDate, DateTime expiryDate, string infyOwner);

        SowMetadata GetSowMetadata();

        IEnumerable<SowData> GetActiveContracts();
    }
}
