using System.Collections.Generic;
using System;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
	public interface IApplicationRepository
	{

        IEnumerable<ApplicationData> GetAllApplications();

		Application Get(int item);

		ApplicationData SaveApplication(ApplicationData application);

        IEnumerable<ApplicationData> FindApplication(int contractId, string serviceLine, string application);

        ApplicationMetadata GetApplicatonMetadata();        
    }
}
