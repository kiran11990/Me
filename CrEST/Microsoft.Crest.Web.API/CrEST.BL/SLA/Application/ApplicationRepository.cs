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
    public class ApplicationRepository : IApplicationRepository
    {
        public IEnumerable<ApplicationData> FindApplication(int contractId, string serviceLine, string application)
        {
            return GetApplications(contractId, serviceLine, application);
        }

        public IEnumerable<ApplicationData> GetAllApplications()
        {
            return GetApplications(0, string.Empty, string.Empty);
        }

        public ApplicationMetadata GetApplicatonMetadata()
        {
            ApplicationMetadata data = new ApplicationMetadata();

            using (CrESTContext _context = new CrESTContext())
            {
                data.ContractIds = _context.SoW.Where(x => x.ContractId != null).Select(x => x.ContractId.Value).Distinct().ToList();
                data.ItOrg = _context.Itorg.ToList();
                data.Suppliers = _context.Supplier.ToList();
            }

            return data;
        }

        public ApplicationData SaveApplication(ApplicationData application)
        {
            using (CrESTContext _context = new CrESTContext())
            {
                Application item = new Application()
                {
                    ApplicationId = application.ApplicationId,
                    Application1 = application.Application,
                    ApplicationGroup = application.ApplicationGroup,
                    EndDate = application.EndDate,
                    EndToEnd = application.EndToEnd,
                    Epm = application.Epm,
                    Itorg = application.Itorg,
                    ManagedCapacity = application.ManagedCapacity,
                    ManagedService = application.ManagedService,
                    OwnerAlias = application.OwnerAlias,
                    RunOrGrow = application.RunOrGrow,
                    ServiceClass = application.ServiceClass,
                    Remarks = application.Remarks,
                    ServiceLine = application.ServiceLine,
                    SoftwareAssetSearchableId = application.SoftwareAssetSearchableId,
                    SoWid = _context.SoW.Where(x => x.ContractId == application.ContractId).FirstOrDefault().SoWid,
                    StartDate = application.StartDate,
                    TM = application.TM,
                    SupplierId = application.SupplierId
                };

                var existingItem = _context.Application.FirstOrDefault(s => s.ApplicationId == application.ApplicationId);
                if (existingItem != null)
                    _context.Application.Update(item);
                else
                    _context.Application.Add(item);
                _context.SaveChanges();
                return application;
            }
        }

        private List<ApplicationData> GetApplications(int contractId, string serviceLine, string application)
        {
            List<ApplicationData> applications = new List<ApplicationData>();

            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "spSearchApplication";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@ContractId", string.Empty));
                cmd.Parameters.Add(new SqlParameter("@ServiceLine", string.Empty));
                cmd.Parameters.Add(new SqlParameter("@Application", string.Empty));

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        applications.Add(new ApplicationData()
                        {
                            ApplicationId = reader.GetInt32(0),
                            SupplierName = reader.GetString(1),
                            ContractId = reader.GetInt32(2),
                            ServiceLine = reader.GetString(3),
                            Application = reader.GetString(4),
                            ServiceClass = reader.IsDBNull(5) ? default(int) : reader.GetInt32(5),
                            RunOrGrow = reader.IsDBNull(6) ? default(int) : reader.GetInt32(6),
                            ApplicationGroup = reader.GetString(7),
                            StartDate = reader.GetDateTime(8),
                            EndDate = reader.GetDateTime(9),
                            EndToEnd = reader.GetBoolean(10),
                            Epm = reader.GetBoolean(11),
                            TM = reader.GetString(12),
                            ManagedCapacity = reader.GetString(13),
                            ManagedService = reader.GetString(14),
                            SoftwareAssetSearchableId = reader.GetString(15),
                            Remarks = reader.IsDBNull(16) ? string.Empty : reader.GetString(16),
                            OwnerAlias = reader.GetString(17),
                            ITOrgName = reader.GetString(18)
                        });
                    }
                }
            }

            return applications;
        }
    }
}

