using System.Collections.Generic;
using System.Linq;
using CrEST.Data.Models;

namespace CrEST.BL
{
	public class SupplierRepository : ISupplierRepository
	{

		public IEnumerable<Supplier> GetAll()
		{
            using (CrESTContext _context = new CrESTContext())
            {
                return _context.Supplier.AsEnumerable();
            }
		}

		public Supplier Get(int item)
		{
            using (CrESTContext _context = new CrESTContext())
            {
                return _context.Supplier.FirstOrDefault(s => s.SupplierId == item);
            }
		}

		public Supplier Put(Supplier item)
		{
            using (CrESTContext _context = new CrESTContext())
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
}
