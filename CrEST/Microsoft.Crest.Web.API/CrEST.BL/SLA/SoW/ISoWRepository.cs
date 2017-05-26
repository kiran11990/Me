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

		SowData SaveSOW(SowData item);

        IEnumerable<SowData> FindSoW(int contractId, int ITOrg, DateTime effectiveDate, DateTime expiryDate, string msOwner);

        SowMetadata GetSowMetadata();

        IEnumerable<SowData> GetActiveContracts();
    }
}
