using System.Collections.Generic;
using System.Linq;
using System;
using CrEST.Data.Models;
using CrEST.Models;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;
using Microsoft.SqlServer.Server;
using System.Data.SqlTypes;

namespace CrEST.BL
{
    public class SlpRepository : ISlpsRepository
    {
        private readonly CrESTContext _context;

        public SlpRepository(CrESTContext context)
        {
            _context = context;
        }

        public IEnumerable<SLAData> GetSlps(string period)
        {
            if (period.Equals("All"))
                return GetSlaFromDb(string.Empty);
            return GetSlaFromDb(period);
        }

        public IEnumerable<ReportingPeriod> GetReportingPeriod()
        {
            List<ReportingPeriod> rps = new List<ReportingPeriod>();

            _context.Database.OpenConnection();
            DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
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

            return rps;
        }

        public IEnumerable<SLAData> GetRASlps()
        {
            List<SLAData> result = new List<SLAData>();
            var slas = GetSlaFromDb(string.Empty);
            foreach (var sla in slas)
            {
                if (sla.Value != "NA" && (sla.MinimumLevel != "TBD" && sla.MinimumLevel != "To be baselined") && (sla.TargetLevel != "TBD" && sla.TargetLevel != "To be baselined"))
                {
                    var value = this.FormatValue(sla.Value);
                    var targetLevel = this.FormatValue(sla.TargetLevel);
                    var minimumLevel = this.FormatValue(sla.MinimumLevel);
                    if (sla.Pref == "H")
                        sla.Chk = (value >= targetLevel ? 3 : (value >= minimumLevel ? 2 : 1));
                    else if (sla.Pref == "L")
                        sla.Chk = (value <= targetLevel ? 3 : (value <= minimumLevel ? 2 : 1));

                    if (sla.Chk == 2 || sla.Chk == 1)
                        result.Add(sla);
                }
            }
            return result;
        }

        public string GenerateSlps(string period, string createdBy)
        {
            string result = string.Empty;
            _context.Database.OpenConnection();
            DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
            cmd.CommandText = "spGenerateSLPData";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@ReportingPeriod", period));
            cmd.Parameters.Add(new SqlParameter("@CreatedBy", createdBy));
            cmd.CommandTimeout = 300;

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    result = reader.GetString(0);
                }
            }
            return result;
        }

        public string SaveSlps(List<SLAData> slas)
        {
            try
            {
                string result = string.Empty;
                List<SqlDataRecord> slalist = new List<SqlDataRecord>();

                SqlMetaData mDataSLAID = new SqlMetaData("SLAID", SqlDbType.UniqueIdentifier, 16, 0, 0, 0, SqlCompareOptions.None, null);
                SqlMetaData mDataValue = new SqlMetaData("Value", SqlDbType.NVarChar, 50);
                SqlMetaData mDataValueRemarks = new SqlMetaData("ValueRemarks", SqlDbType.NVarChar, -1);
                SqlMetaData mDataLastModifiedBy = new SqlMetaData("LastModifiedBy", SqlDbType.NVarChar, 50);

                foreach (var item in slas)
                {
                    SqlDataRecord sla = new SqlDataRecord(new[] { mDataSLAID, mDataValue, mDataValueRemarks, mDataLastModifiedBy });
                    sla.SetGuid(0, item.Id);
                    sla.SetString(1, item.Value);
                    sla.SetString(2, item.ValueRemarks);
                    sla.SetString(3, item.LastModifiedBy);
                    slalist.Add(sla);
                }

                SqlParameter param = new SqlParameter("@SLAList", SqlDbType.Structured)
                {
                    TypeName = "SLPType",
                    Value = slalist
                };


                _context.Database.OpenConnection();
                DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spSaveUpdateSLPData";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(param);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result = reader.GetString(0);
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        private IEnumerable<SLAData> GetSlaFromDb(string period)
        {
            List<SLAData> slas = new List<SLAData>();

            _context.Database.OpenConnection();
            DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
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
                    sla.ServiceClass = reader.IsDBNull(10) ? string.Empty : (reader.GetString(10));
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

