using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Crest.Web.API.Models;
using Microsoft.Crest.Web.API.Data;
using Microsoft.Crest.Web.API.CrEST.BL;

namespace Microsoft.Crest.Web.API.Controllers
{
	[Route("api/[controller]")]
    public class SupplierController : Controller
    {		
		private readonly ISupplierRepository _supplierRepository;

		//public ValuesController(IValue crestValueRepository)
		//{
		//	_crestValueRepository = crestValueRepository;
		//}

		public SupplierController()
		{
			CrESTContext _context = new Microsoft.Crest.Web.API.Data.CrESTContext();
			_supplierRepository = new SupplierRepository(_context);
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
