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

    service: Service = new Service();
    private currencyPattern = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/;
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
                        this.serviceList = data
                       
                    })
            }
        
        
    }
    onitOrgChange(value: any) {
        this.service.itorg = value;
    }

    onChange(value: any) {
        this.service.supplierId = value;

    }
    onChancrestLevel1(value: any) {
        this.service.crestLevel1 = value;
    }
    onChancrestLevel2(value: any) {
        this.service.crestLevel2 = value;
    }


    onChancrestLevel3(value: any) {
        this.service.crestLevel3 = value;
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
        if (confirm("Do you want Update")) {
            return false;
        }
        else {
            this.router.navigate(['services', { sowStatus: "updatedsuccessfully" }]);
        }
        event.preventDefault();
    }

    submitForm(Service: Service) {
        //applicationData.endDate = enddate;

        this.Sservice.addservice(this.service)
            .subscribe((result: number) => {
                var result = result;
                if (result == 1) {
                    alert("success fully added");
                }
            });
    }
}
