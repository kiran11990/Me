using System.Collections.Generic;
using CrEST.Data.Models;
using CrEST.Models;

namespace CrEST.BL
{
	public interface ISlpsRepository
	{
        IEnumerable<SLAData> GetSlps(string period, string alias);
        IEnumerable<ReportingPeriod> GetReportingPeriod();
        IEnumerable<SLAData> GetSlpsByStatus(int status);
    }
}
