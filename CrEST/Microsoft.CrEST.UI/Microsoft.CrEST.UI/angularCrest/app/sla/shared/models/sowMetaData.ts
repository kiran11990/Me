﻿export class SowMetaData {
    public contractIds: Array<number>;
    public suppliers: Array<Supplier>;
    public itOrg: Array<ITOrg>;
    public serviceClass: Array<ServiceClass>;
    public companyCodes: Array<number>;
};

export class Supplier {
    public supplierId: number;
    public supplierName: string;
    public isCrest: boolean;
}


export class ITOrg {
    public itOrgId: number;
    public itOrgName: string;

}
export class ServiceClass {
    public id: number;
    public serviceClassName: string;
}
