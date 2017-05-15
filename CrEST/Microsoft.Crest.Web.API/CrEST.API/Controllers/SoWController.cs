using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Crest.Web.API.Models;
using Microsoft.Crest.Web.API.Data;
using Microsoft.Crest.Web.API.CrEST.BL;

namespace Microsoft.Crest.Web.API.Controllers
{
    [Route("api/[controller]")]
    public class SowController : Controller
    {		
		private readonly ISoWRepository _sowRepository;
        
		public SowController()
		{
			CrESTContext _context = new Data.CrESTContext();
			_sowRepository = new SoWRepository(_context);
		}

		//[Route("")]
		//[Route("GetAllSoWs")]
		//public IEnumerable<SoW> GetAllSoWs()
		//{
		//	return _sowRepository.GetAll();
		//}

		//[HttpGet("{id}")]		
		[Route("")]
		[Route("GetSoWById/{id}")] // [SoW/GetSoWById/id]
		public SoW GetSoWById(int id)
		{
			return _sowRepository.Get(id);
		}

		[HttpPut("SaveSoW")]	//	[SoW/SaveSoW]
		public SoW SaveSoW([FromBody]SoW item)
		{
			return _sowRepository.Put(item);
		}

		[HttpGet("FindSoWs/{contractId}/'{ITOrg}'/{expiryDate}/'{msOwner}'")] // [SoW/FindSows/contractId/'ITOrg'/expiryDate/'msOwner']
		public IEnumerable<SoW> FindSoWs([FromHeader]int contractId, string ITOrg, [FromHeader]DateTime expiryDate, string msOwner)
		{
			IEnumerable<SoW> results = _sowRepository.FindSoW(contractId, ITOrg, expiryDate, msOwner);			
			return results;
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
