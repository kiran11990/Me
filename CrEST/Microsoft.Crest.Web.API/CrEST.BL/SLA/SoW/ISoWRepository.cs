using System.Collections.Generic;
using System;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
	public interface ISoWRepository
	{
		IEnumerable<SoW> GetAll();

		SoW Get(int item);

		SoW Put(SoW item);

		IEnumerable<SoW> FindSoW(int contractId, int ITOrg, DateTime expiryDate, string msOwner);

        SowMetadata GetSowMetadata();
    }
}
