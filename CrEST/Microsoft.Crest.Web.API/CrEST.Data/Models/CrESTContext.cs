using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CrEST.Data.Models
{
    public partial class CrESTContext : DbContext
    {
        public virtual DbSet<Application> Application { get; set; }
        public virtual DbSet<CrestLevel1> CrestLevel1 { get; set; }
        public virtual DbSet<CrestLevel2> CrestLevel2 { get; set; }
        public virtual DbSet<CrestLevel3> CrestLevel3 { get; set; }
        public virtual DbSet<Itorg> Itorg { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<ServiceCatalog> ServiceCatalog { get; set; }
        public virtual DbSet<ServiceClass> ServiceClass { get; set; }
        public virtual DbSet<ServiceLevelPerformance> ServiceLevelPerformance { get; set; }
        public virtual DbSet<Slabase> Slabase { get; set; }
        public virtual DbSet<SoW> SoW { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            //optionsBuilder.UseSqlServer(@"Server=HYDPCM389913D2;Database=CrEST;Trusted_Connection=True;MultipleActiveResultSets=true;");
            optionsBuilder.UseSqlServer(@"Server=azfipacctsql32;Database=CrEST;Trusted_Connection=True;MultipleActiveResultSets=true;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>(entity =>
            {
                entity.Property(e => e.Application1).HasColumnName("Application");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Epm).HasColumnName("EPM");

                entity.Property(e => e.Itorg).HasColumnName("ITOrg");

                entity.Property(e => e.ManagedCapacity).HasMaxLength(50);

                entity.Property(e => e.ManagedService).HasMaxLength(50);

                entity.Property(e => e.OwnerAlias).HasMaxLength(20);

                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.Property(e => e.SoftwareAssetSearchableId)
                    .HasColumnName("SoftwareAssetSearchableID")
                    .HasColumnType("nchar(20)");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.TM)
                    .HasColumnName("T&M")
                    .HasMaxLength(50);

                entity.HasOne(d => d.ItorgNavigation)
                    .WithMany(p => p.Application)
                    .HasForeignKey(d => d.Itorg)
                    .HasConstraintName("FK_Application_ITOrg");

                entity.HasOne(d => d.ServiceClassNavigation)
                    .WithMany(p => p.Application)
                    .HasForeignKey(d => d.ServiceClass)
                    .HasConstraintName("FK_Application_ServiceClass");

                entity.HasOne(d => d.SoW)
                    .WithMany(p => p.Application)
                    .HasForeignKey(d => d.SoWid)
                    .HasConstraintName("FK_Application_SoW1");
            });

            modelBuilder.Entity<CrestLevel1>(entity =>
            {
                entity.Property(e => e.CrestServiceId).HasMaxLength(50);

                entity.Property(e => e.Service).IsRequired();
            });

            modelBuilder.Entity<CrestLevel2>(entity =>
            {
                entity.Property(e => e.CrestServiceId).HasMaxLength(50);

                entity.Property(e => e.Service).IsRequired();

                entity.HasOne(d => d.CrestLevel1)
                    .WithMany(p => p.CrestLevel2)
                    .HasForeignKey(d => d.CrestLevel1Id)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CrestLevel2_CrestLevel1");
            });

            modelBuilder.Entity<CrestLevel3>(entity =>
            {
                entity.Property(e => e.Applicability).HasMaxLength(50);

                entity.Property(e => e.CrestServiceId).HasMaxLength(50);

                entity.Property(e => e.Service)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.CrestLevel2)
                    .WithMany(p => p.CrestLevel3)
                    .HasForeignKey(d => d.CrestLevel2Id)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CrestLevel3_CrestLevel2");
            });

            modelBuilder.Entity<Itorg>(entity =>
            {
                entity.ToTable("ITOrg");

                entity.Property(e => e.ItorgId).HasColumnName("ITOrgId");

                entity.Property(e => e.ItorgName)
                    .IsRequired()
                    .HasColumnName("ITOrgName")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.AppGroupServiceFeeY1).HasColumnType("money");

                entity.Property(e => e.AppGroupServiceFeeY2).HasColumnType("money");

                entity.Property(e => e.AppGroupServiceFeeY3).HasColumnType("money");

                entity.Property(e => e.AppGroupServiceFeeY4).HasColumnType("money");

                entity.Property(e => e.CrestLevel2).HasMaxLength(20);

                entity.Property(e => e.Currency).HasMaxLength(20);

                entity.Property(e => e.Itorg).HasColumnName("ITOrg");

                entity.Property(e => e.Scid)
                    .HasColumnName("SCID")
                    .HasMaxLength(20);

                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.HasOne(d => d.CrestLevel1Navigation)
                    .WithMany(p => p.ServiceNavigation)
                    .HasForeignKey(d => d.CrestLevel1)
                    .HasConstraintName("FK_Services_CrestLevel1");

                entity.HasOne(d => d.CrestLevel3Navigation)
                    .WithMany(p => p.ServiceNavigation)
                    .HasForeignKey(d => d.CrestLevel3)
                    .HasConstraintName("FK_Service_CrestLevel3");

                entity.HasOne(d => d.ItorgNavigation)
                    .WithMany(p => p.Service)
                    .HasForeignKey(d => d.Itorg)
                    .HasConstraintName("FK_Service_ITOrg");

                entity.HasOne(d => d.SoW)
                    .WithMany(p => p.Service)
                    .HasForeignKey(d => d.SoWid)
                    .HasConstraintName("FK_Service_SoW");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.Service)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK_Service_Supplier");
            });

            modelBuilder.Entity<ServiceCatalog>(entity =>
            {
                entity.Property(e => e.CrestL1id).HasColumnName("CrestL1Id");

                entity.Property(e => e.CrestL2id).HasColumnName("CrestL2Id");

                entity.Property(e => e.MeasurementUnit).HasMaxLength(10);

                entity.Property(e => e.MeasurementWindow).HasMaxLength(50);

                entity.Property(e => e.MinimumLevel).HasMaxLength(20);

                entity.Property(e => e.MinimumSl).HasColumnName("MinimumSL");

                entity.Property(e => e.ServiceMetricClass).HasMaxLength(50);

                entity.Property(e => e.Slaid)
                    .IsRequired()
                    .HasColumnName("SLAId")
                    .HasMaxLength(50);

                entity.Property(e => e.Source).HasMaxLength(50);

                entity.Property(e => e.TargetLevel).HasMaxLength(20);

                entity.Property(e => e.TargetSl).HasColumnName("TargetSL");

                entity.Property(e => e.Type).HasMaxLength(5);

                entity.Property(e => e.Weightage).HasMaxLength(20);

                entity.HasOne(d => d.CrestL1)
                    .WithMany(p => p.ServiceCatalog)
                    .HasForeignKey(d => d.CrestL1id)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_SLA_CrestLevel1");

                entity.HasOne(d => d.CrestL2)
                    .WithMany(p => p.ServiceCatalog)
                    .HasForeignKey(d => d.CrestL2id)
                    .HasConstraintName("FK_SLA_CrestLevel2");
            });

            modelBuilder.Entity<ServiceClass>(entity =>
            {
                entity.Property(e => e.ServiceClassName)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<ServiceLevelPerformance>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("newid()");

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LastModifiedBy).HasMaxLength(50);

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pref).HasMaxLength(5);

                entity.Property(e => e.ReportingPeriod).HasMaxLength(50);

                entity.Property(e => e.SlabaseId).HasColumnName("SLABaseId");

                entity.Property(e => e.Value).HasMaxLength(150);

                entity.HasOne(d => d.Slabase)
                    .WithMany(p => p.ServiceLevelPerformance)
                    .HasForeignKey(d => d.SlabaseId)
                    .HasConstraintName("FK_ServiceLevelPerformance_SLABase");
            });

            modelBuilder.Entity<Slabase>(entity =>
            {
                entity.ToTable("SLABase");

                entity.Property(e => e.ApplicationGroup).HasMaxLength(500);

                entity.Property(e => e.Environment).HasMaxLength(50);

                entity.Property(e => e.Itorg).HasColumnName("ITOrg");

                entity.Property(e => e.PriorityLevel).HasMaxLength(50);

                entity.Property(e => e.Scid)
                    .HasColumnName("SCID")
                    .HasMaxLength(25);

                entity.Property(e => e.SeverityLevel).HasMaxLength(50);

                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.HasOne(d => d.CrestLevel1)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.CrestLevel1Id)
                    .HasConstraintName("FK_SLABase_CrestLevel1");

                entity.HasOne(d => d.CrestLevel2)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.CrestLevel2Id)
                    .HasConstraintName("FK_SLABase_CrestLevel2");

                entity.HasOne(d => d.ItorgNavigation)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.Itorg)
                    .HasConstraintName("FK_SLABase_ITOrg");

                entity.HasOne(d => d.ServiceCatalog)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.ServiceCatalogId)
                    .HasConstraintName("FK_SLAServiceCatalog");

                entity.HasOne(d => d.ServiceClassNavigation)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.ServiceClass)
                    .HasConstraintName("FK_SLABase_ServiceClass");

                entity.HasOne(d => d.SoW)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.SoWid)
                    .HasConstraintName("FK_SLABase_SoW");
            });

            modelBuilder.Entity<SoW>(entity =>
            {
                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.Property(e => e.Currency).HasMaxLength(20);

                entity.Property(e => e.InfyOwner).HasMaxLength(150);

                entity.Property(e => e.Itorg).HasColumnName("ITOrg");

                entity.Property(e => e.Msowner)
                    .HasColumnName("MSOwner")
                    .HasMaxLength(150);

                entity.Property(e => e.PonumYear1).HasColumnName("PONumYear1");

                entity.Property(e => e.SowamountYear1)
                    .HasColumnName("SOWAmountYear1")
                    .HasColumnType("money");

                entity.Property(e => e.SowamountYear2)
                    .HasColumnName("SOWAmountYear2")
                    .HasColumnType("money");

                entity.Property(e => e.SowamountYear3)
                    .HasColumnName("SOWAmountYear3")
                    .HasColumnType("money");

                entity.Property(e => e.SowamountYear4)
                    .HasColumnName("SOWAmountYear4")
                    .HasColumnType("money");

                entity.Property(e => e.SoweffectiveDate)
                    .HasColumnName("SOWEffectiveDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.SowexpirationDate)
                    .HasColumnName("SOWExpirationDate")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.ItorgNavigation)
                    .WithMany(p => p.SoW)
                    .HasForeignKey(d => d.Itorg)
                    .HasConstraintName("FK_SOW_ITOrg");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.SoW)
                    .HasForeignKey(d => d.SupplierId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Sow_Supplier");
            });
        }
    }
}