using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;
using CrEST.Models;

namespace Microsoft.Crest.Web.API.Controllers
{
    [Route("api/[controller]")]
    public class SowController : Controller
    {		
		private readonly ISoWRepository _sowRepository;
        
		public SowController()
		{
			_sowRepository = new SoWRepository();
		}
  
        [HttpGet]
        [Route("GetAllSoWs")]
        public IEnumerable<SoW> GetAllSoWs()
        {
            return _sowRepository.GetAll();
        }
        
        [HttpGet]
		[Route("GetSoWById/{id}")]
		public SoW GetSoWById(int id)
		{
			return _sowRepository.Get(id);
		}

		[HttpPost]
        [Route("SaveSoW")]
		public SoW SaveSoW([FromBody]SoW item)
		{
			return _sowRepository.Put(item);
		}

		[HttpGet]
        [Route("FindSoWs/{contractId}/{ITOrg}/{expiryDate}/'{msOwner}'")]
        public IEnumerable<SoW> FindSoWs([FromHeader]int contractId, int ITOrg, [FromHeader]DateTime expiryDate, string msOwner)
		{
			IEnumerable<SoW> results = _sowRepository.FindSoW(contractId, ITOrg, expiryDate, msOwner);			
			return results;
		}

        [HttpGet]
        [Route("GetSowMetadata")]
        public SowMetadata GetSowMetadata()
        {
            return _sowRepository.GetSowMetadata();
        }

    }
}
