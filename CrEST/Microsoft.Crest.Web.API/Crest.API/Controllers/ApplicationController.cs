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

		[HttpGet]
		[Route("GetApplicationById/{id}")]
		public ApplicationData GetApplicationById(int id)
		{
			return _applicationRepository.GetById(id);
		}

		[HttpPost]
        [Route("SaveApplication")]
        public int SaveApplication([FromBody]ApplicationData item)
        {
            return _applicationRepository.SaveApplication(item);
        }

        [HttpGet]
        [Route("FindApplication/{contractId}/{serviceLine}/{application}")]
        public IEnumerable<ApplicationData> FindApplication(int contractId, string serviceLine,string application)
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
