using System.Collections.Generic;
using System.Linq;
using System;
using CrEST.Data.Models;
using CrEST.Models;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace CrEST.BL
{
    public class SlpRepository : ISlpsRepository
    {
        public IEnumerable<SLAData> GetSlps(string period)
        {
            if (period.Equals("All"))
                return GetSlaFromDb(string.Empty);
            return GetSlaFromDb(period);
        }

        public IEnumerable<ReportingPeriod> GetReportingPeriod()
        {
            List<ReportingPeriod> rps = new List<ReportingPeriod>();

            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spGetReportingPeriod";
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        ReportingPeriod rp = new ReportingPeriod();
                        rp.Id = reader.GetInt32(0);
                        rp.Period = reader.GetString(1);
                        rps.Add(rp);
                    }
                }
            }

            return rps;
        }

        public IEnumerable<SLAData> GetSlpsByStatus(int status)
        {
            List<SLAData> result = new List<SLAData>();
            var slas = GetSlaFromDb(string.Empty);
            foreach (var sla in slas)
            {
                if (sla.Value != "NA" && (sla.MinimumLevel != "TBD" && sla.MinimumLevel != "To be baselined")  && (sla.TargetLevel != "TBD" && sla.TargetLevel != "To be baselined"))
                {
                    var value = this.FormatValue(sla.Value);
                    var targetLevel = this.FormatValue(sla.TargetLevel);
                    var minimumLevel = this.FormatValue(sla.MinimumLevel);
                    if (sla.Pref == "H")
                        sla.Chk = (value >= targetLevel ? 3 : (value >= minimumLevel ? 2 : 1));
                    else if (sla.Pref == "L")
                        sla.Chk = (value <= targetLevel ? 3 : (value <= minimumLevel ? 2 : 1));

                    if (sla.Chk == status)
                        result.Add(sla);
                }
            }
            return result;
        }

        private IEnumerable<SLAData> GetSlaFromDb(string period)
        {
            List<SLAData> slas = new List<SLAData>();

            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spSLPData";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@ReportingPeriod", period));

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        SLAData sla = new SLAData();
                        sla.Id = reader.GetGuid(0);
                        sla.SlabaseId = reader.GetInt32(1);
                        sla.SupplierName = reader.GetString(2);
                        sla.SCID = reader.GetString(3);
                        sla.ContractId = reader.GetInt32(4);
                        sla.ApplicationGroup = reader.GetString(5);
                        sla.CrestLevel1 = reader.IsDBNull(6) ? string.Empty : reader.GetString(6);
                        sla.CrestLevel2 = reader.IsDBNull(7) ? string.Empty : reader.GetString(7);
                        sla.SLAId = reader.IsDBNull(8) ? string.Empty : reader.GetString(8);
                        sla.ServiceMetric = reader.GetString(9);
                        sla.ServiceClass = reader.IsDBNull(10) ? default(int) : (reader.GetInt32(10));
                        sla.SeverityLevel = reader.IsDBNull(11) ? string.Empty : (reader.GetString(11));
                        sla.PriorityLevel = reader.IsDBNull(12) ? string.Empty : (reader.GetString(12));
                        sla.Environment = reader.IsDBNull(13) ? string.Empty : (reader.GetString(13));
                        sla.IsCustom = reader.IsDBNull(14) ? default(bool) : (reader.GetBoolean(14));
                        sla.TargetLevel = reader.IsDBNull(15) ? string.Empty : (reader.GetString(15));
                        sla.MinimumLevel = reader.IsDBNull(16) ? string.Empty : (reader.GetString(16));
                        sla.Remarks = reader.IsDBNull(17) ? string.Empty : (reader.GetString(17));
                        sla.ValidationNotes = reader.IsDBNull(19) ? string.Empty : (reader.GetString(19));
                        sla.ReportingPeriod = reader.GetString(20);
                        sla.Pref = reader.GetString(21);
                        sla.Type = sla.MinimumLevel.Contains("%") ? "P" : "N";
                        sla.Value = reader.IsDBNull(23) ? string.Empty : (reader.GetString(23));
                        sla.ValueRemarks = reader.IsDBNull(24) ? string.Empty : reader.GetString(24);
                        slas.Add(sla);
                    }
                }
            }

            return slas;
        }

        private double FormatValue(string value)
        {
            double result = 0;
            if (value.EndsWith("%"))
            {
                value = value.TrimEnd('%');
                result = Convert.ToDouble(value) / 100;
            }
            else result = Convert.ToInt32(value);
            return result;
        }
    }
}

