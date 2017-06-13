import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sservice } from "../shared/services/service.service";
import { Service } from "../shared/models/service";
import { ServiceMetaData } from "../shared/models/serviceMetaData";
@Component({
    selector: 'service-form',
    templateUrl: './serviceformaddupdate.component.html'
})

export class ServicelineFormComponent implements OnInit {
    // date: Date = new Date();
    serviceForm: FormGroup;
    title: string;
    public serviceMetaData: ServiceMetaData[] = [];
    public serviceList: Service[] = [];
    public editServiceList: Service[] = [];
    public id: string = "";
    public supplierFlag: boolean = true;
    public contractIdFlag: boolean = true;
    public serviceClassFlag: boolean = true;
    public runOrGrowFlag: boolean = true;
    public itorgFlag: boolean = true;
    public crestLvl1: boolean = true;
    public crestLvl2: boolean = true;
    public crestLvl3: boolean = true;
    

    service: Service = new Service();
	private currencyPattern = /^(\d+(\.\d*)?)$/;
    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private Sservice: Sservice
    ) {
        this.serviceForm = formBuilder.group({

            'supplier': ['', Validators.required],
            'SCID': ['', Validators.required],
            'contractId': ['', Validators.required],
            'ApplicationGroup': ['', Validators.required],
            'crestLvl1': ['', Validators.required],
            'crestLvl2': ['', Validators.required],
            'crestLvl3': [''],
            'appgroupservicesfeeyr1': ['', Validators.pattern(this.currencyPattern)],
            'appgroupservicesfeeyr2': ['', Validators.pattern(this.currencyPattern)],
            'appgroupservicesfeeyr3': ['', Validators.pattern(this.currencyPattern)],
            'appgroupservicesfeeyr4': ['', Validators.pattern(this.currencyPattern)],
            'currency': [''],
            'validationNote': ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
            //'remarks': ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
            'remarks': ['', Validators.required],
            'itOrg': [''],
        });
    }


    ngOnInit() {
        this.service.currency = "USD"
        this.SericeMetaData();
        this.id = this.route.snapshot.params['id'];
        this.title = this.id ? 'Edit Service' : 'New Service';
        if (this.id != null) {
            this.Sservice.getServiceById(this.id)
                .subscribe(data => {
                    this.service = data
                })
        }


    }
    onitOrgChange(value: any) {
        if (value != undefined) {
            this.itorgFlag = false;
        }
        this.service.itorg = value;
    }

    onChange(value: any) {
        if (value != undefined) {
            this.supplierFlag = false;
        }
        this.service.supplierId = value;

    }
    onChancrestLevel1(value: any) {
        if (value != undefined) {
            this.crestLvl1 = false;
        }
        this.service.crestLevel1Id = value;
    }
    onChancrestLevel2(value: any) {
        if (value != undefined){
            this.crestLvl2 = false;
        }
       
        this.service.crestLevel2 = value;
    }


    onChancrestLevel3(value: any) {
        if (value != undefined) {
            this.crestLvl3 = false;
        }
        this.service.crestLevel3Id = value;
    }
    onChangContractId(value: any) {
        if (value != undefined) {
            this.contractIdFlag = false;
        }
        this.service.contractId = value;
    }
    SericeMetaData() {
        this.Sservice.getServiceMetaData()
            .subscribe(data => {
                this.serviceMetaData = data;
            })
    }

    onChangecurrency(value: any) {
        this.service.currency = value;
    }


    redirect() {
		if (confirm("Are you sure you want to leave this page?")) {
			this.router.navigate(['/home/services', { servicetatus: "updatedsuccessfully" }]);
        }
    }

    submitForm(service: Service) {
        //applicationData.endDate = enddate;

        this.Sservice.addservice(this.service)
            .subscribe((result: number) => {
                var result = result;
                if (result == 1) {
                    this.id ? alert(" Service Updated Successfully") : alert("Service Saved Successfully")
					this.router.navigate(['/home/services', { servicetatus: "updatedsuccessfully" }]);
                }
            });
    }
}
