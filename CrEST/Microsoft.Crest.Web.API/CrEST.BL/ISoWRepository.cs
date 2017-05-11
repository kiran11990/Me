using System.Collections.Generic;
using Microsoft.Crest.Web.API.Models;
using System;

namespace Microsoft.Crest.Web.API.CrEST.BL
{
	public interface ISoWRepository
	{
		IEnumerable<SoW> GetAll();

		SoW Get(int item);

		SoW Put(SoW item);

		IEnumerable<SoW> FindSoW(int contractId, string ITOrg, DateTime expiryDate, string msOwner);
	}
}
