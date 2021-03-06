﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CrEST.BL;
using CrEST.Data.Models;
using CrEST.Models;

namespace Microsoft.Crest.Web.API.Controllers
{
    [Route("api/[controller]")]
    public class ServiceController : Controller
    {		
		private readonly IServiceRepository _serviceRepository;
        
		public ServiceController()
		{
            _serviceRepository = new ServiceRepository();
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
        [Route("FindServices/{contractId}/'{applicationGroup}'")]
        public IEnumerable<ServiceData> FindServices([FromHeader]int contractId, [FromHeader]string applicationGroup)
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
