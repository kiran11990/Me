using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;
using CrEST.Models;

namespace Microsoft.Crest.Web.API.Controllers
{
    [Route("api/[controller]")]
    public class SlpController : Controller
    {		
		private readonly ISlpsRepository _slpRepository;
        
		public SlpController(CrESTContext context)
		{
            _slpRepository = new SlpRepository(context);
		}
  
        [HttpGet]
        [Route("GetSLPs/{period}")]
        public IEnumerable<SLAData> GetSlps(string period)
        {
            return _slpRepository.GetSlps(period);
        }

        [HttpGet]
        [Route("GetReportingPeriod")]
        public IEnumerable<ReportingPeriod> GetReportingPeriod()
        {
            return _slpRepository.GetReportingPeriod();
        }

        [HttpGet]
        [Route("GetSlpsByStatus/{status}")]
        public IEnumerable<SLAData> GetSlpsByStatus(int status)
        {
            return _slpRepository.GetSlpsByStatus(status);
        }

        [HttpGet]
        [Route("GenerateSlps/{period}/{status}")]
        public string GenerateSlps(string period, string createdBy = "")
        {
            return _slpRepository.GenerateSlps(period, createdBy);
        }

        [HttpPost]
        [Route("SaveSlps")]
        public string SaveSlps([FromBody]List<SLAData> slps)
        {
            if (slps == null)
            {
                throw new ArgumentNullException("slps");
            }
            return _slpRepository.SaveSlps(slps);
        }

    }
}
