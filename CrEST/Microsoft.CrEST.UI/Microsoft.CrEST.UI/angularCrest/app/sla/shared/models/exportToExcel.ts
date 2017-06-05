export class ExportToExcel {
    sows: ExcelSow[];
    services: ExcelServices[];
    applications: ExcelApplications[];
    slps: ExcelSLA[];
}

class ExcelSow {
    supplierName: string;
    itorgName: string;
    contractId: number;
    soweffectiveDate: Date;
    sowexpirationDate: Date;
    msowner: string;
    serviceCatalogVersion: number;
    ponumYear1: number;
    currency: string;
    sowamountYear1: number;
    sowamountYear2: number;
    sowamountYear3: number;
    sowamountYear4: number;
    isCrest: boolean;
    remarks: string;
    ssoLead: string;
    ssoValidated: string;
    companyCode: number;
}

class ExcelServices {
    supplier: string;
    scid: string;
    contractId: string;
    applicationGroup: string;
    crestLevel1: string;
    crestLevel2: string;
    crestLevel3: string;
    appGroupServiceFeeY1: string;
    appGroupServiceFeeY2: string;
    appGroupServiceFeeY3: string;
    appGroupServiceFeeY4: string;
    currency: string;
    validationNotes: string;
    remarks: string;
    itorgName: string;
}

class ExcelApplications {
    supplierName: string;
    contractId: number;
    serviceLine: string;
    application: string;
    ownerAlias: string; 
    serviceClass: number;
    runOrGrow: number;
    applicationGroup: string;
    startDate: Date
    endDate: Date
    endToEnd: boolean;
    epm: boolean;
    tM: string;
    managedCapacity: string;
    managedService: string;
    softwareAssetSearchableId: string;
    remarks: string;
    itOrgName: number;
}

class ExcelSLA {
    supplierName: string;
    scid: string;
    contractId: number;
    applicationGroup: string;
    crestLevel1: string;
    crestLevel2: string;
    slaId: string;
    serviceMetric: string;
    serviceClass: string;
    severityLevel: string;
    priorityLevel: string;
    environment: string;
    isCustom: boolean;
    minimumLevel: string;
    targetLevel: string;
    weightage: string;
    remarks: string;
    validationNotes: string;
    reportingPeriod: string;
    pref: string;
    type: string;
    value: string;
    valueRemarks: string;
}