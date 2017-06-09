using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;
using CrEST.Models;
using Microsoft.AspNetCore.Cors;

namespace Microsoft.Crest.Web.API.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class ApplicationController : Controller
    {		
		private readonly IApplicationRepository _applicationRepository;
        
		public ApplicationController(CrESTContext context, IApplicationRepository applicationRepository)
		{
            _applicationRepository = applicationRepository;
            //_applicationRepository = new ApplicationRepository(context);
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
        [Route("FindApplication")]
        public IEnumerable<ApplicationData> FindApplication([FromQuery]int contractId, [FromQuery]string serviceLine, [FromQuery]string application)
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
