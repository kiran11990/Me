using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CrEST.Models;

namespace CrEST.Data
{
    public partial class CrESTContext : DbContext
    {
        public virtual DbSet<Application> Application { get; set; }
        public virtual DbSet<CrestLevel1> CrestLevel1 { get; set; }
        public virtual DbSet<CrestLevel2> CrestLevel2 { get; set; }
        public virtual DbSet<CrestLevel3> CrestLevel3 { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<ServiceCatalog> ServiceCatalog { get; set; }
        public virtual DbSet<ServiceLevelPerformance> ServiceLevelPerformance { get; set; }
        public virtual DbSet<Slabase> Slabase { get; set; }
        public virtual DbSet<SoW> SoW { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }

        // Unable to generate entity type for table 'dbo.SLABaseRemarksHistory'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"Server=(local);Database=CrEST;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>(entity =>
            {
                entity.Property(e => e.Application1).HasColumnName("Application");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Epm).HasColumnName("EPM");

                entity.Property(e => e.ManagedCapacity).HasMaxLength(50);

                entity.Property(e => e.ManagedService).HasMaxLength(50);

                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.Property(e => e.SoftwareAssetSearchableId)
                    .HasColumnName("SoftwareAssetSearchableID")
                    .HasColumnType("nchar(10)");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.TM)
                    .HasColumnName("T&M")
                    .HasMaxLength(50);

                entity.HasOne(d => d.ApplicationGroupNavigation)
                    .WithMany(p => p.Application)
                    .HasForeignKey(d => d.ApplicationGroup)
                    .HasConstraintName("FK_Application_Service");

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

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.AppGroupServiceFeeY1).HasColumnType("money");

                entity.Property(e => e.AppGroupServiceFeeY2).HasColumnType("money");

                entity.Property(e => e.AppGroupServiceFeeY3).HasColumnType("money");

                entity.Property(e => e.AppGroupServiceFeeY4).HasColumnType("money");

                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.HasOne(d => d.CrestLevel1Navigation)
                    .WithMany(p => p.ServiceNavigation)
                    .HasForeignKey(d => d.CrestLevel1)
                    .HasConstraintName("FK_Services_CrestLevel1");

                entity.HasOne(d => d.CrestLevel2Navigation)
                    .WithMany(p => p.ServiceNavigation)
                    .HasForeignKey(d => d.CrestLevel2)
                    .HasConstraintName("FK_Service_CrestLevel2");

                entity.HasOne(d => d.CrestLevel3Navigation)
                    .WithMany(p => p.ServiceNavigation)
                    .HasForeignKey(d => d.CrestLevel3)
                    .HasConstraintName("FK_Service_CrestLevel3");

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

                entity.Property(e => e.MinimumSl).HasColumnName("MinimumSL");

                entity.Property(e => e.ServiceMetricClass).HasMaxLength(50);

                entity.Property(e => e.Slaid)
                    .IsRequired()
                    .HasColumnName("SLAId")
                    .HasMaxLength(50);

                entity.Property(e => e.Source).HasMaxLength(50);

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

            modelBuilder.Entity<ServiceLevelPerformance>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LastModifiedBy).HasMaxLength(50);

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

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

                entity.Property(e => e.Environment).HasMaxLength(50);

                entity.Property(e => e.Pref).HasMaxLength(5);

                entity.Property(e => e.PriorityLevel).HasMaxLength(50);

                entity.Property(e => e.SeverityLevel).HasMaxLength(50);

                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.Property(e => e.Type).HasMaxLength(5);

                entity.HasOne(d => d.ApplicationGroup)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.ApplicationGroupId)
                    .HasConstraintName("FK_SLABase_Service");

                entity.HasOne(d => d.CrestLevel1)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.CrestLevel1Id)
                    .HasConstraintName("FK_SLABase_CrestLevel1");

                entity.HasOne(d => d.CrestLevel2)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.CrestLevel2Id)
                    .HasConstraintName("FK_SLP_CrestLevel2");

                entity.HasOne(d => d.ServiceCatalog)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.ServiceCatalogId)
                    .HasConstraintName("FK_SLABase_ServiceCatalog");

                entity.HasOne(d => d.SoW)
                    .WithMany(p => p.Slabase)
                    .HasForeignKey(d => d.SoWid)
                    .HasConstraintName("FK_SLABase_SoW");
            });

            modelBuilder.Entity<SoW>(entity =>
            {
                entity.Property(e => e.SoWid).HasColumnName("SoWId");

                entity.Property(e => e.EffectiveDate).HasColumnType("datetime");

                entity.Property(e => e.ExpirationDate).HasColumnType("datetime");

                entity.Property(e => e.InfyOwner).HasMaxLength(150);

                entity.Property(e => e.Msowner)
                    .HasColumnName("MSOwner")
                    .HasMaxLength(150);

                entity.Property(e => e.PonumYear1).HasColumnName("PONumYear1");

                entity.Property(e => e.ServiceLine).HasMaxLength(50);

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

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.SoW)
                    .HasForeignKey(d => d.SupplierId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Sow_Supplier_X");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.Supplier1)
                    .HasColumnName("Supplier")
                    .HasColumnType("varchar(120)");
            });
        }
    }
}