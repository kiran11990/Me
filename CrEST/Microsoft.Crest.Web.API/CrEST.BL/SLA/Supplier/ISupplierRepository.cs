using System.Collections.Generic;
using CrEST.Models;

namespace CrEST.BL
{
	public interface ISupplierRepository
	{
		IEnumerable<Supplier> GetAll();

		Supplier Get(int item);

		Supplier Put(Supplier item);		
	}
}
