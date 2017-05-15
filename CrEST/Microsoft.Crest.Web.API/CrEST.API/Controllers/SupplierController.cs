using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;

namespace Microsoft.Crest.Web.API.Controllers
{
	[Route("api/[controller]")]
    public class SupplierController : Controller
    {		
		private readonly ISupplierRepository _supplierRepository;
        
		public SupplierController()
		{
			_supplierRepository = new SupplierRepository();
		}

		// GET api/values
		[HttpGet]
        public IEnumerable<Supplier> GetAllSuppliers()
        {
			return _supplierRepository.GetAll();			
		}

		[HttpGet("{id}")]
		public Supplier GetSupplier(int id)
		{
			return _supplierRepository.Get(id);
		}

		[HttpPut]		
		public Supplier PutSupplier([FromBody]Supplier item)
		{
			Supplier newItem = _supplierRepository.Put(item);

			return newItem;

			//if (item.SupplierId == newItem.SupplierId)
			//{
			//	RedirectToAction(
			//}
		}		

		// DELETE api/values/5
		[HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
