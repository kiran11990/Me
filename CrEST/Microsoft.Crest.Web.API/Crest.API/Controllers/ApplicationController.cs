using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;
using CrEST.Models;

namespace Microsoft.Crest.Web.API.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationController : Controller
    {		
		private readonly IApplicationRepository _applicationRepository;
        
		public ApplicationController()
		{
            _applicationRepository = new ApplicationRepository();
		}
  
        [HttpGet]
        [Route("GetAllApplications")]
        public IEnumerable<ApplicationData> GetAllApplications()
        {
            return _applicationRepository.GetAllApplications();
        }

        [HttpPost]
        [Route("SaveApplication")]
        public ApplicationData SaveApplication([FromBody]ApplicationData item)
        {
            return _applicationRepository.SaveApplication(item);
        }

        [HttpGet]
        [Route("FindApplication/{contractId}/'{serviceLine}/'{application}''")]
        public IEnumerable<ApplicationData> FindApplication([FromHeader]int contractId, [FromHeader]string serviceLine, [FromHeader]string application)
        {
            return _applicationRepository.FindApplication(contractId, serviceLine, application);
        }

        [HttpGet]
        [Route("GetApplicationMetadata")]
        public ApplicationMetadata GetServiceMetadata()
        {
            return _applicationRepository.GetApplicatonMetadata();
        }
    }
}
