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
	public class ServiceRepository : IServiceRepository
	{
		private readonly CrESTContext _context;

		public ServiceRepository(CrESTContext context)
		{
			_context = context;
		}

		public ServiceData GetById(int item)
		{
			List<ServiceData> services = new List<ServiceData>();

			_context.Database.OpenConnection();
			DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
			cmd.CommandText = "spGetServiceById";
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.Add(new SqlParameter("@ServiceId", item));

			ServiceData existingItem = new ServiceData();

			using (var reader = cmd.ExecuteReader())
			{
				while (reader.Read())
				{
					existingItem.ServiceId = reader.GetInt32(0);
					existingItem.Supplier = reader.GetString(1);
					existingItem.Scid = reader.GetString(2);
					existingItem.ContractId = reader.GetInt32(3);
					existingItem.ApplicationGroup = reader.GetString(4);
					existingItem.CrestLevel1 = reader.IsDBNull(5) ? string.Empty : reader.GetString(5);
					existingItem.CrestLevel2 = reader.IsDBNull(6) ? string.Empty : reader.GetString(6);
					existingItem.CrestLevel3 = reader.IsDBNull(7) ? string.Empty : reader.GetString(7);
					existingItem.AppGroupServiceFeeY1 = reader.IsDBNull(8) ? default(decimal) : reader.GetDecimal(8);
					existingItem.AppGroupServiceFeeY2 = reader.IsDBNull(9) ? default(decimal) : reader.GetDecimal(9);
					existingItem.AppGroupServiceFeeY3 = reader.IsDBNull(10) ? default(decimal) : reader.GetDecimal(10);
					existingItem.AppGroupServiceFeeY4 = reader.IsDBNull(11) ? default(decimal) : reader.GetDecimal(11);
					existingItem.Currency = reader.GetString(12);
					existingItem.ValidationNotes = reader.IsDBNull(13) ? string.Empty : reader.GetString(13);
					existingItem.Remarks = reader.IsDBNull(14) ? string.Empty : reader.GetString(14);
					existingItem.ItorgName = reader.GetString(15);
					existingItem.SupplierId = reader.GetInt32(16);
				}
			}

			return existingItem;

		}

		public IEnumerable<ServiceData> GetAllServices()
		{
			List<ServiceData> services = new List<ServiceData>();

			_context.Database.OpenConnection();
			DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
			cmd.CommandText = "spGetServices";
			cmd.CommandType = CommandType.StoredProcedure;

			using (var reader = cmd.ExecuteReader())
			{
				while (reader.Read())
				{
					services.Add(new ServiceData()
					{
						ServiceId = reader.GetInt32(0),
						Supplier = reader.GetString(1),
						Scid = reader.GetString(2),
						ContractId = reader.GetInt32(3),
						ApplicationGroup = reader.GetString(4),
						CrestLevel1 = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
						CrestLevel2 = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
						CrestLevel3 = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
						AppGroupServiceFeeY1 = reader.IsDBNull(8) ? default(decimal) : reader.GetDecimal(8),
						AppGroupServiceFeeY2 = reader.IsDBNull(9) ? default(decimal) : reader.GetDecimal(9),
						AppGroupServiceFeeY3 = reader.IsDBNull(10) ? default(decimal) : reader.GetDecimal(10),
						AppGroupServiceFeeY4 = reader.IsDBNull(11) ? default(decimal) : reader.GetDecimal(11),
						Currency = reader.GetString(12),
						ValidationNotes = reader.IsDBNull(13) ? string.Empty : reader.GetString(13),
						Remarks = reader.IsDBNull(14) ? string.Empty : reader.GetString(14),
						ItorgName = reader.GetString(15),
						SupplierId = reader.GetInt32(16)
					});
				}
			}

			return services;
		}

		public ServiceData SaveService(ServiceData service)
		{
			Service item = new Service()
			{
				SupplierId = Convert.ToInt32(service.SupplierId),
				SoWid = _context.SoW.FirstOrDefault(x => x.ContractId == service.ContractId).SoWid,
				ApplicationGroup = service.ApplicationGroup,
				CrestLevel1 = service.CrestLevel1Id,
				CrestLevel2 = service.CrestLevel2,
				CrestLevel3 = service.CrestLevel3Id,
				AppGroupServiceFeeY1 = service.AppGroupServiceFeeY1,
				AppGroupServiceFeeY2 = service.AppGroupServiceFeeY2,
				AppGroupServiceFeeY3 = service.AppGroupServiceFeeY3,
				AppGroupServiceFeeY4 = service.AppGroupServiceFeeY4,
				ValidationNotes = service.ValidationNotes,
				Remarks = service.Remarks,
				Scid = service.Scid,
				Currency = service.Currency,
				Itorg = _context.Itorg.FirstOrDefault(x => x.ItorgName == service.ItorgName).ItorgId
			};

			var existingItem = _context.Service.FirstOrDefault(s => s.ServiceId == service.ServiceId);
			if (existingItem == null)
				_context.Service.Add(item);

			_context.SaveChanges();
			return service;


		}

		public IEnumerable<ServiceData> FindServices(int contractId, string applicationGroup)
		{
			List<ServiceData> services = new List<ServiceData>();

			_context.Database.OpenConnection();
			DbCommand cmd = _context.Database.GetDbConnection().CreateCommand();
			cmd.CommandText = "spSearchService";
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.Add(new SqlParameter("@ContractId", contractId));
            if (applicationGroup == null)
                cmd.Parameters.Add(new SqlParameter("@ApplicationGroup", string.Empty));
            else
            cmd.Parameters.Add(new SqlParameter("@ApplicationGroup", applicationGroup));

			using (var reader = cmd.ExecuteReader())
			{
				while (reader.Read())
				{
					services.Add(new ServiceData()
					{
						Scid = reader.GetString(0),
						ServiceId = reader.GetInt32(1),
						SupplierId = reader.GetInt32(2),
						ContractId = reader.GetInt32(3),
						ApplicationGroup = reader.GetString(4),
						CrestLevel1 = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
						CrestLevel2 = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
						CrestLevel3 = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
						AppGroupServiceFeeY1 = reader.IsDBNull(8) ? default(decimal) : reader.GetDecimal(8),
						AppGroupServiceFeeY2 = reader.IsDBNull(9) ? default(decimal) : reader.GetDecimal(9),
						AppGroupServiceFeeY3 = reader.IsDBNull(10) ? default(decimal) : reader.GetDecimal(10),
						AppGroupServiceFeeY4 = reader.IsDBNull(11) ? default(decimal) : reader.GetDecimal(11),
						Currency = reader.GetString(12),
						ValidationNotes = reader.IsDBNull(13) ? string.Empty : reader.GetString(13),
						Remarks = reader.IsDBNull(14) ? string.Empty : reader.GetString(14),
						Itorg = reader.GetInt32(15),
						Supplier = _context.Supplier.Where(x => x.SupplierId == reader.GetInt32(2)).FirstOrDefault().SupplierName,
						ItorgName = _context.Itorg.Where(x => x.ItorgId == reader.GetInt32(15)).FirstOrDefault().ItorgName
					});
				}
			}

			return services;
		}

		public ServiceMetadata GetServiceMetadata()
		{
			ServiceMetadata data = new ServiceMetadata();

			data.ContractIds = _context.SoW.Where(x => x.ContractId != null).Select(x => x.ContractId.Value).Distinct().ToList();
			data.CrestLevel1s = _context.CrestLevel1.ToList();
			data.CrestLevel2s = _context.CrestLevel2.ToList();
			data.CrestLevel3s = _context.CrestLevel3.ToList();
			data.ItOrg = _context.Itorg.ToList();
			data.Suppliers = _context.Supplier.ToList();

			return data;
		}

		public ServiceMetadataList GetServiceMetadataList()
		{
			ServiceMetadataList data = new ServiceMetadataList();

			data.ContractIds = _context.SoW.Where(x => x.ContractId != null).Select(x => x.ContractId.Value).Distinct().ToList();
			data.CrestLevel1Metadata = _context.CrestLevel1
												.Select(x=>new CrestLevel1Metadata() {
													Id =x.Id,
													Service =x.Service
												})
												.ToList();
			data.CrestLevel2Metadata = _context.CrestLevel2
												.Select(x => new CrestLevel2Metadata()
												{
													Id = x.Id,
													Service = x.Service
												})
												.ToList();
			data.CrestLevel3Metadata = _context.CrestLevel3
												.Select(x => new CrestLevel3Metadata()
												{
													Id = x.Id,
													Service = x.Service
												})
												.ToList();
			data.ItOrgMetadata = _context.Itorg.Select(x => new ItorgMetadata()
												{
													ItorgId = x.ItorgId,
													ItorgName = x.ItorgName
												})
												.ToList();
			data.SupplierMetadata = _context.Supplier.Select(x => new SupplierMetadata()
													{
														SupplierId = x.SupplierId,
														SupplierName = x.SupplierName
													})
													.ToList();

			return data;
		}
	}
}

