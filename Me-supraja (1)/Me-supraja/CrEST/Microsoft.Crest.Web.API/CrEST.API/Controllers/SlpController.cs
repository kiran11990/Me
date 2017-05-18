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
        [Route("GetSLPs/'{period}'/'{infyOwner}'")]
        public IEnumerable<SLAData> GetSlps([FromHeader]string period, [FromHeader] string infyOwner)
        {
            return _slpRepository.GetSlps(period, infyOwner);
        }

        [HttpGet]
        [Route("GetReportingPeriod")]
        public IEnumerable<ReportingPeriod> GetReportingPeriod()
        {
            return _slpRepository.GetReportingPeriod();
        }

    }
}
