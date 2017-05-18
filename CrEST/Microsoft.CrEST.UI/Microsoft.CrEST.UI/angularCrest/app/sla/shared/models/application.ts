export class Application {
    //application: string
    //contactId: string
    //serviceLine: string
    //serviceClass: string
    //runVsGrow: string
    //applicatioGroup: string 
    //startDate: string
    //endDate: string
    //serviceLineChk: string
    //endToEnd: string
    //epm: string
    //tm: string
    //managedCapacity: string
    //managedServices: string
    //applicationChk:string
    //softwareAssetSearchableID: string
    //remarks: string

    applicationId: number;
    soWid: number;
    serviceLine: string;
    application1: string;
    serviceClass: number;
    runOrGrow: number;
    applicationGroup: string;
    startDate: Date;
    endDate: Date;
    endToEnd: boolean;
    epm: boolean;
    tM: string;
    managedCapacity: string;
    managedService: string;
    softwareAssetSearchableId: string;
    remarks: string;
    supplierId: number;
    ownerAlias: string;
    itorg: number;
    iTOrgName: number;
}

      
         
         //string Application1 { get; set; }
         //int ? ServiceClass { get; set; }
         //int ? RunOrGrow { get; set; }
         //string ApplicationGroup { get; set; }
         //DateTime ? StartDate { get; set; }
         //DateTime ? EndDate { get; set; }
         //bool ? EndToEnd { get; set; }
         //bool ? Epm { get; set; }
         //string TM { get; set; }
         //string ManagedCapacity { get; set; }
         //string ManagedService { get; set; }
         //string SoftwareAssetSearchableId { get; set; }
         //string Remarks { get; set; }
         //int ? SupplierId { get; set; }
         //string OwnerAlias { get; set; }
         //int ? Itorg { get; set; }

         //virtual Itorg ItorgNavigation { get; set; }
         //virtual ServiceClass ServiceClassNavigation { get; set; }
         //virtual SoW SoW { get; set; }