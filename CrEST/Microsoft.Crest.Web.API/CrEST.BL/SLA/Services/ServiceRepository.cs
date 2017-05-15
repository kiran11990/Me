using System.Collections.Generic;
using System.Linq;
using System;
using CrEST.Data.Models;
using CrEST.Models;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CrEST.BL
{
    public class ServiceRepository : IServiceRepository
    {
        public IEnumerable<ServiceData> GetAllServices()
        {
            List<ServiceData> services = new List<ServiceData>();

            using (CrESTContext db = new CrESTContext())
            {
                db.Database.OpenConnection();
                DbCommand cmd = db.Database.GetDbConnection().CreateCommand();
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
                            CrestLevel1 = reader.GetString(5),
                            CrestLevel2 = reader.GetString(6),
                            CrestLevel3 = reader.GetString(7),
                            AppGroupServiceFeeY1 = reader.IsDBNull(8) ? default(decimal) : reader.GetDecimal(8),
                            AppGroupServiceFeeY2 = reader.IsDBNull(9) ? default(decimal) : reader.GetDecimal(9),
                            AppGroupServiceFeeY3 = reader.IsDBNull(10) ? default(decimal) : reader.GetDecimal(10),
                            AppGroupServiceFeeY4 = reader.IsDBNull(11) ? default(decimal) : reader.GetDecimal(11),
                            Currency = reader.GetString(12),
                            ValidationNotes = reader.GetString(13),
                            Remarks = reader.GetString(14),
                            Itorg = reader.GetString(15)
                        });
                    }
                }
            }

            return services;
        }

        public ServiceData SaveService(ServiceData service)
        {
            return new ServiceData();
        }

        public IEnumerable<ServiceData> FindServices(int contractId, string applicationGroup)
        {
            return new List<ServiceData>();
        }

        public ServiceMetadata GetServiceMetadata()
        {
            return new ServiceMetadata();
        }

    }
}

