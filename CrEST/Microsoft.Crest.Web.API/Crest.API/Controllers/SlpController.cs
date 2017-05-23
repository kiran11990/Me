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
        
		public SlpController()
		{
            _slpRepository = new SlpRepository();
		}
  
        [HttpGet]
        [Route("GetSLPs/'{period}'")]
        public IEnumerable<SLAData> GetSlps([FromHeader]string period)
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
        public IEnumerable<SLAData> GetSlpsByStatus([FromHeader]int status)
        {
            return _slpRepository.GetSlpsByStatus(status);
        }

    }
}
