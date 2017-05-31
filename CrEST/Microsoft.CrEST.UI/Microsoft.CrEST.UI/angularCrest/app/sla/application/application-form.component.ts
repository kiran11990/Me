/// <reference path="../shared/models/applicationmetadata.ts" />
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from "../shared/models/application";
import { ApplicationData } from "../shared/models/applicationdata";
import { ApplicationService } from "./../shared/services/application.service";
import { ApplicationMetaData } from "../shared/models/applicationmetadata";
import { RunOrGrow } from "../shared/models/applicationmetadata";
import { CommonModule } from '@angular/common';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { Http } from '@angular/http';

@Component({
    selector: 'sla-applicationForm',
    template: require('./application-form.component.html'),

})
export class ApplicationFormComponent implements OnInit {
    applicationList: Application = new Application();
    applicationData: ApplicationData = new ApplicationData();
    startdate: Date = new Date();
    endDate: Date = new Date();
    submitAttempt = false;
    routeID: number;
    public applicationMetaData: ApplicationMetaData[] = [];
    applicationForm: FormGroup;
    //public runvsgrow: number[] = [];
    public outparam: string = '';
    public dropdownSettings = {};
    public mydate: string;
    public runOrGrow: RunOrGrow[] = [];
    public title: any;
    constructor(private _routeParams: ActivatedRoute, private applicationService: ApplicationService, private router: Router, formBuilder: FormBuilder, private http: Http) {
       


        this.applicationForm = formBuilder.group({
          
            'supplier': ['', Validators.required],
            'contactId': ['', Validators.required],
            'serviceline': ['', Validators.required],
            'Application': ['', Validators.required],
            //'applicationId': ['', Validators.required],
            //'supplierName': ['', Validators.required],
            'OwnerAlias': ['', Validators.required],
            'Serviceclass': [''],
            'Runvsgrow': ['', Validators.required],
            'ApplicationGroup': ['', Validators.required],
            'startDate': ['', Validators.required],
            'endDate': ['', Validators.required],
            'endtoend': [''],
            'epm': [''],
            'tm': ['', Validators.pattern(/[0-9]*\.?[0-9]+%/)],
            'ManagedCapacity': ['', Validators.pattern(/[0-9]*\.?[0-9]+%/)],
            'ManagedServices': ['', Validators.pattern(/[0-9]*\.?[0-9]+%/)],
            'Software': ['',  Validators.pattern(/^[a-zA-Z0-9]*$/)],
            'remarks': ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
            'itOrg': [''],
            //'itorg':['']
        })
        this.applicationData.endDate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
        this.applicationData.startDate = new Date(Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), this.endDate.getHours(), this.endDate.getMinutes(), this.endDate.getSeconds()));
        //this.mydate = '2016-01-10';

    }

    private startDate: Object = {
        date: {
            year: this.startdate.getFullYear(),
            month: this.startdate.getMonth() + 1,
            day: this.startdate.getDate()
        }
    };

    



    private enddate: Object = {
        date: {
            year: this.startdate.getFullYear(),
            month: this.startdate.getMonth() + 1,
            day: this.startdate.getDate()
        } 
    };
    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };

    onstartDateChanged(event: IMyDateModel) {
        this.startdate =  event.jsdate;
    }

    onendDateChanged(event: IMyDateModel) {
        this.endDate = event.jsdate;
    }
    ngOnInit() {
        this.runOrGrow = [{
            id: 1,
            name: "run"
        },
        {
            id: 2,
            name: "grow"
        },
        {
            id: 1,
            name: "run and grow"
        }]; 
        this.getApplicationMetaData();
        //called after the constructor and called  after the first ngOnChanges() 
        this.title = this._routeParams.snapshot.params['id'] ? 'Edit Application' : 'New Application';
        if (this._routeParams.snapshot.params['id'] != null) {
            var id = this._routeParams.snapshot.params['id'];
            this.routeID = this._routeParams.snapshot.params['id'];
            this.applicationService.getApplicationbyId(id)
                .subscribe(data => {
                    this.applicationData = data

                    this.applicationData.softwareAssetSearchableId = (this.applicationData.softwareAssetSearchableId == null) ? this.applicationData.softwareAssetSearchableId :this.applicationData.softwareAssetSearchableId.trim(); 
                    var datepickerEndDate = new Date(this.applicationData.endDate);
                    var datepickerStartDate = new Date(this.applicationData.startDate);
                    this.enddate = <IMyDateModel>{
                        date: {
                            year: datepickerEndDate.getFullYear(),
                            month: datepickerEndDate.getMonth()+1,
                            day: datepickerEndDate.getDate()
                        },
                       
                    }
                    this.startDate = <IMyDateModel>{
                        date: {
                            year: datepickerStartDate.getFullYear(),
                            month: datepickerStartDate.getMonth()+1,
                            day: datepickerStartDate.getDate()
                        },

                    }
                    
                })
        }
    }

    onChange(value: any) {
        this.applicationData.supplierId = value;
    }

    onContactChange(value: any) {
        this.applicationData.contractId = value;

    }
    onServiceclassChange(value: any) {
        this.applicationData.serviceClass = value;
    }

    onrunOrGrowChange(value: any) {
        this.applicationData.runOrGrow = value;
    }
    onitOrgChange(value: any) {
        this.applicationData.itorg = value;
    }


    
    getApplicationMetaData() {
        this.applicationService.getApplicationMetaData()
            .subscribe(data => {
                this.applicationMetaData = data;
            })
    }
    initSubmit(applicationData: ApplicationData) {
         var startdate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
        var enddate = new Date(Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), this.endDate.getHours(), this.endDate.getMinutes(), this.endDate.getSeconds()));
        applicationData.startDate = startdate;
        applicationData.endDate = enddate;
        //applicationData.endDate = enddate;
        
        this.applicationService.addApplication(this.applicationData)
            .subscribe((result: number) => {
                var result = result;
                if (result == 1) {
                    this.routeID ? alert(" Application Updated Successfully") : alert("Application Saved Successfully")
                    this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
                }
            });
    }

    submit() {
        console.log('success!');
    }
    redirect() {

        if (confirm("Do You Want? Update")) {
            this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
        }
        else {
            this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
        }
    }
}