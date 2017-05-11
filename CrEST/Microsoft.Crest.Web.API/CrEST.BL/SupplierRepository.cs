using System.Collections.Generic;
using Microsoft.Crest.Web.API.Models;
using Microsoft.Crest.Web.API.Data;

using System.Linq;

namespace Microsoft.Crest.Web.API.CrEST.BL
{
	public class SupplierRepository : ISupplierRepository
	{
		private readonly CrESTContext _context;

		public SupplierRepository(CrESTContext context)
		{
			_context = context;
		}

		public IEnumerable<Supplier> GetAll()
		{
			return _context.Supplier.AsEnumerable();
		}

		public Supplier Get(int item)
		{
			return _context.Supplier.FirstOrDefault(s => s.SupplierId == item);
		}

		public Supplier Put(Supplier item)
		{
			if (item == null)
			{
				return item;
			}

			Supplier existingItem = _context.Supplier.FirstOrDefault(s => s.SupplierId == item.SupplierId);
			if (existingItem != null)
			{
				existingItem.SupplierName = item.SupplierName;
				existingItem.IsCrest = item.IsCrest;
				_context.Supplier.Update(existingItem);
				item = existingItem;
			}
			else
			{
				_context.Supplier.Add(item);
			}

			_context.SaveChanges();
			return item;			
		}
	}
}
