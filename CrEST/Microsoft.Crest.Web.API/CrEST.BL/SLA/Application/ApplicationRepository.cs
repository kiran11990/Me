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

		public ApplicationData GetById(int item)
		{
			using (CrESTContext db = new CrESTContext())
			{
				db.Database.OpenConnection();
				DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
				cmd.CommandText = "spGetApplicationById";
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.Add(new SqlParameter("@ApplicationId", item));

				ApplicationData existingItem = new ApplicationData();

				using (var reader = cmd.ExecuteReader())
				{
					while (reader.Read())
					{												
						existingItem.ApplicationId = reader.GetInt32(0);
						existingItem.SupplierId = reader.GetInt32(1);
						existingItem.SupplierName = reader.GetString(2);
						existingItem.ContractId = reader.GetInt32(3);
						existingItem.ServiceLine = reader.GetString(4);
						existingItem.Application = reader.GetString(5);
						existingItem.ServiceClass = reader.IsDBNull(6) ? default(int) : reader.GetInt32(6);
						existingItem.RunOrGrow = reader.IsDBNull(7) ? default(int) : reader.GetInt32(7);
						existingItem.ApplicationGroup = reader.GetString(8);
						existingItem.StartDate = reader.GetDateTime(9);
						existingItem.EndDate = reader.GetDateTime(10);
						existingItem.EndToEnd = reader.GetBoolean(11);
						existingItem.Epm = reader.GetBoolean(12);
						existingItem.TM = reader.GetString(13);
						existingItem.ManagedCapacity = reader.GetString(14);
						existingItem.ManagedService = reader.GetString(15);
						existingItem.SoftwareAssetSearchableId = reader.GetString(16);
						existingItem.Remarks = reader.IsDBNull(17) ? string.Empty : reader.GetString(17);
						existingItem.OwnerAlias = reader.GetString(18);
						existingItem.ITOrgName = reader.IsDBNull(19) ? default(int) : reader.GetInt32(19);
                        existingItem.SoWid = reader.GetInt32(20);
                    }				
				}

				return existingItem;
			}			
		}

		public ApplicationMetadata GetApplicatonMetadata()
        {
            ApplicationMetadata data = new ApplicationMetadata();

            using (CrESTContext _context = new CrESTContext())
            {
                data.ContractIds = _context.SoW.Where(x => x.ContractId != null).Select(x => x.ContractId.Value).Distinct().ToList();
                data.ItOrg = _context.Itorg.ToList();
                data.Suppliers = _context.Supplier.ToList();
                data.ServiceClass = _context.ServiceClass.ToList();
            }

            return data;
        }

        public int SaveApplication(ApplicationData applicationData)
        {
            using (CrESTContext _context = new CrESTContext())
            {
				Application application = _context.Application.Where(s => s.ApplicationId == applicationData.ApplicationId).SingleOrDefault();

				if (application == null)
				{
					application = new Application();
				}

				application.Application1 = applicationData.Application;
                application.ApplicationGroup = applicationData.ApplicationGroup;
				application.EndDate = applicationData.EndDate;
				application.EndToEnd = applicationData.EndToEnd;
				application.Epm = applicationData.Epm;
				application.Itorg = applicationData.Itorg;
				application.ManagedCapacity = applicationData.ManagedCapacity;
				application.ManagedService = applicationData.ManagedService;
				application.OwnerAlias = applicationData.OwnerAlias;
				application.RunOrGrow = applicationData.RunOrGrow;
				application.ServiceClass = applicationData.ServiceClass;
				application.Remarks = applicationData.Remarks;
				application.ServiceLine = applicationData.ServiceLine;
				application.SoftwareAssetSearchableId = applicationData.SoftwareAssetSearchableId;
				application.SoWid = _context.SoW.Where(x => x.ContractId == applicationData.ContractId).FirstOrDefault().SoWid;
				application.StartDate = applicationData.StartDate;
				application.TM = applicationData.TM;
				application.SupplierId = applicationData.SupplierId;


                if (application.ApplicationId == 0) 
                    _context.Application.Add(application);

                return _context.SaveChanges();
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
                cmd.Parameters.Add(new SqlParameter("@ContractId", contractId));
				if (serviceLine == null)
					cmd.Parameters.Add(new SqlParameter("@ServiceLine", string.Empty));
				else
					cmd.Parameters.Add(new SqlParameter("@ServiceLine", serviceLine));
				if (application == null)
					cmd.Parameters.Add(new SqlParameter("@Application", string.Empty));
				else
					cmd.Parameters.Add(new SqlParameter("@Application", application));

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
                            ITOrgName = reader.IsDBNull(18) ? default(int) : reader.GetInt32(18),
                            SoWid = reader.GetInt32(19)

                    });
                    }
                }
            }

            return applications;
        }
    }
}

