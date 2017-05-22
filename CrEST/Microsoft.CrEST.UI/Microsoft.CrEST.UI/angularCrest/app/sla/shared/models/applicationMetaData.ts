export class ApplicationMetaData {
    public contractIds: Array <number>;
    public suppliers: Array<Supplier>;
    public itOrg: Array<ITOrg>;
}

export class Supplier {
    public supplierId: number;
    public supplierName: string;
    public isCrest: boolean;
}


export class ITOrg {
    public itOrgId: number;
    public itOrgName: string;
    
}