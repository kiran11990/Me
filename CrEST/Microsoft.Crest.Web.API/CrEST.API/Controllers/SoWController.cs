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
        public IEnumerable<SowData> GetAllSoWs()
        {
            return _sowRepository.GetAll();
        }
        
        [HttpGet]
		[Route("GetSoWById/{id}")]
		public SowData GetSoWById(int id)
		{
			return _sowRepository.GetById(id);
		}

		[HttpPost]
        [Route("SaveSoW")]
		public SowData SaveSoW([FromBody]SowData item)
		{
			return _sowRepository.SaveSOW(item);
		}

		[HttpGet]
        [Route("FindSoWs/{contractId}/{ITOrg}/{effectiveDate}/{expiryDate}/'{msOwner}'")]
        public IEnumerable<SowData> FindSoWs([FromHeader]int contractId, int ITOrg, [FromHeader]DateTime effectiveDate, [FromHeader]DateTime expiryDate, string msOwner)
		{
			IEnumerable<SowData> results = _sowRepository.FindSoW(contractId, ITOrg, effectiveDate, expiryDate, msOwner);			
			return results;
		}

        [HttpGet]
        [Route("GetSowMetadata")]
        public SowMetadata GetSowMetadata()
        {
            return _sowRepository.GetSowMetadata();
        }

        [HttpGet]
        [Route("GetActiveContracts")]
        public IEnumerable<SowData> GetActiveContracts()
        {
            return _sowRepository.GetActiveContracts();
        }

    }
}
