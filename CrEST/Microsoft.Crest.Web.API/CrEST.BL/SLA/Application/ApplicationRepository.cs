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
		private readonly CrESTContext _context;

		public ApplicationRepository(CrESTContext context)
		{
			_context = context;
		}

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

			_context.Database.OpenConnection();
			DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
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
					existingItem.Itorg = reader.IsDBNull(19) ? default(int) : reader.GetInt32(19);
					existingItem.ITOrgName = _context.Itorg.Where(x => x.ItorgId == reader.GetInt32(19)).FirstOrDefault().ItorgName;
					existingItem.SoWid = reader.GetInt32(20);
				}
			}

			return existingItem;

		}

		public ApplicationMetadata GetApplicatonMetadata()
		{
			ApplicationMetadata data = new ApplicationMetadata();


			data.ContractIds = _context.SoW.Where(x => x.ContractId != null).Select(x => x.ContractId.Value).Distinct().ToList();
			data.ItOrg = _context.Itorg.ToList();
			data.Suppliers = _context.Supplier.ToList();
			data.ServiceClass = _context.ServiceClass.ToList();


			return data;
		}

		public int SaveApplication(ApplicationData applicationData)
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

		private List<ApplicationData> GetApplications(int contractId, string serviceLine, string application)
		{
			List<ApplicationData> applications = new List<ApplicationData>();


			_context.Database.OpenConnection();
			DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
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

			ApplicationData item = new ApplicationData(); 

			using (var reader = cmd.ExecuteReader())
			{
				while (reader.Read())
				{
					item.ApplicationId = reader.GetInt32(0);
					item.SupplierName = reader.IsDBNull(1) ? string.Empty : reader.GetString(1);
					item.ContractId = reader.GetInt32(2);
					item.ServiceLine = reader.IsDBNull(3) ? string.Empty : reader.GetString(3);
					item.Application = reader.IsDBNull(4) ? string.Empty : reader.GetString(4);
					item.ServiceClass = reader.IsDBNull(5) ? default(int) : reader.GetInt32(5);
					item.RunOrGrow = reader.IsDBNull(6) ? default(int) : reader.GetInt32(6);
					item.ApplicationGroup = reader.IsDBNull(7) ? string.Empty : reader.GetString(7);
					item.StartDate = reader.GetDateTime(8);
					item.EndDate = reader.GetDateTime(9);
					item.EndToEnd = reader.GetBoolean(10);
					item.Epm = reader.GetBoolean(11);
					item.TM = reader.IsDBNull(12) ? string.Empty : reader.GetString(12);
					item.ManagedCapacity = reader.IsDBNull(13) ? string.Empty : reader.GetString(13);
					item.ManagedService = reader.IsDBNull(14) ? string.Empty : reader.GetString(14);
					item.SoftwareAssetSearchableId = reader.GetString(15);
					item.Remarks = reader.IsDBNull(16) ? string.Empty : reader.GetString(16);
					item.OwnerAlias = reader.IsDBNull(17) ? string.Empty : reader.GetString(17);
					item.Itorg = reader.IsDBNull(18) ? default(int) : reader.GetInt32(18);
					item.ITOrgName = _context.Itorg.Where(x => x.ItorgId == item.Itorg).FirstOrDefault().ItorgName;
					item.SoWid = reader.GetInt32(19);
					applications.Add(item);
				}
			}

			return applications;
		}
	}
}

