﻿using System.Collections.Generic;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
	public interface IServiceRepository
	{
		IEnumerable<ServiceData> GetAllServices();

        ServiceData SaveService(ServiceData service);

        IEnumerable<ServiceData> FindServices(int contractId, string applicationGroup);

        ServiceMetadata GetServiceMetadata();
    }
}
