using System.Collections.Generic;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
	public interface ISlpsRepository
	{
        IEnumerable<SLAData> GetSlps(string period);
        IEnumerable<ReportingPeriod> GetReportingPeriod();
        IEnumerable<SLAData> GetSlpsByStatus(int status);
        string GenerateSlps(string period, string createdBy);
        string SaveSlps(List<SLAData> slps);
    }
}
