using System.Collections.Generic;
using Microsoft.Crest.Web.API.Models;

namespace Microsoft.Crest.Web.API.CrEST.BL
{
	public interface ISupplierRepository
	{
		IEnumerable<Supplier> GetAll();

		Supplier Get(int item);

		Supplier Put(Supplier item);		
	}
}
