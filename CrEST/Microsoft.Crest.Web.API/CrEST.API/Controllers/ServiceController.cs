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
    public class ServiceController : Controller
    {		
		private readonly IServiceRepository _serviceRepository;
        
		public ServiceController(CrESTContext context)
		{
            _serviceRepository = new ServiceRepository(context);
		}

		[HttpGet]
		[Route("GetServiceById/{id}")]
		public ServiceData GetServiceById(int id)
		{
			return _serviceRepository.GetById(id);
		}		

		[HttpGet]
        [Route("GetAllServices")]
        public IEnumerable<ServiceData> GetAllServices()
        {
            return _serviceRepository.GetAllServices();
        }

        [HttpPost]
        [Route("SaveService")]
        public ServiceData SaveService([FromBody]ServiceData item)
        {
            return _serviceRepository.SaveService(item);
        }

        [HttpGet]
        [Route("FindServices")]
        public IEnumerable<ServiceData> FindServices([FromQuery]int contractId, [FromQuery]string applicationGroup)
        {
            return _serviceRepository.FindServices(contractId, applicationGroup);
        }

        [HttpGet]
        [Route("GetServiceMetadata")]
        public ServiceMetadata GetServiceMetadata()
        {
            return _serviceRepository.GetServiceMetadata();
        }
    }
}
