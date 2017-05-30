export class ServiceMetaData {
           public suppliers: Array<Supplier>;
            public contractIds: Array<number>;
            public crestLevel1s: Array<CrestLevel1>;
            public crestLevel2: Array<CrestLevel2>;
            public crestLevel3: Array<CrestLevel3>;
            public itOrg: Array<ITOrg>;
};


        export class CrestLevel1 {
            public id: number;
            public service: string;
        
        }


        export class ITOrg {
            public itOrgId: number;
            public itOrgName: string;

        }
        export class CrestLevel2 {
            public id: number;
            public service: string;
           
        }

        export class CrestLevel3 {
            public id: number;
            public Service: string;
          

        }
        export class Supplier {
            public supplierId: number;
            public supplierName: string;
        }
