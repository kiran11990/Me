export class ServiceMetaData {
           public suppliers: Array<Supplier>;
            public contractIds: Array<number>;
            public crestLevel1s: Array<CrestLevel1Metadata>;
            public crestLevel2: Array<CrestLevel2Metadata>;
            public crestLevel3: Array<CrestLevel3Metadata>;
            public itOrg: Array<ITOrg>;
};


export class CrestLevel1Metadata {
            public id: number;
            public service: string;
        
        }


        export class ITOrg {
            public itOrgId: number;
            public itOrgName: string;

        }
        export class CrestLevel2Metadata {
            public id: number;
            public service: string;
           
        }

        export class CrestLevel3Metadata {
            public id: number;
            public Service: string;
          

        }
        export class Supplier {
            public supplierId: number;
            public supplierName: string;
        }
