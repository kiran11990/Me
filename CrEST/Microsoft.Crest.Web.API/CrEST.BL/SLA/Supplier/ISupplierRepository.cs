using CrEST.Data.Models;
using System.Collections.Generic;


namespace CrEST.BL
{
	public interface ISupplierRepository
	{
		IEnumerable<Supplier> GetAll();

		Supplier Get(int item);

		Supplier Put(Supplier item);		
	}
}
