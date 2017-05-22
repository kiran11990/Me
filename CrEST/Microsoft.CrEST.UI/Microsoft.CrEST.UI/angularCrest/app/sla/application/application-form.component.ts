/// <reference path="../shared/models/applicationmetadata.ts" />
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from "../shared/models/application";
import { ApplicationData } from "../shared/models/applicationdata";
import { ApplicationService } from "./../shared/services/application.service";
import { ApplicationMetaData } from "../shared/models/applicationmetadata";
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
    public applicationMetaData: ApplicationMetaData[] = [];
    applicationForm: FormGroup;

    public outparam: string = '';
    public dropdownSettings = {};
    public mydate: string;
    constructor(private _routeParameterd: ActivatedRoute, private applicationService: ApplicationService, private router: Router, formBuilder: FormBuilder, private http: Http) {
       

        this.applicationForm = formBuilder.group({
          
            'msowneralias': [null, Validators.required]



        })
        //this.mydate = '2016-01-10';

    }
    
    // startdate: Object = {
    //    date: {
    //        year: this.date.getFullYear(),
    //        month: this.date.getMonth() + 1,
    //        day: this.date.getdate()
    //    }
    //};

    



    private enddate: Object = {
        date: {
            year: this.startdate.getFullYear(),
            month: this.startdate.getMonth() + 1,
            day: this.startdate.getDate()
        }
    };
    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };


    onstartDateChanged(event: IMyDateModel) {
        
        this.startdate =  event.jsdate;
        
    }

    onendDateChanged(event: IMyDateModel) {
        this.endDate = event.jsdate;
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
    ngOnInit() {

      

        this.applicationService.getApplicationMetaData()
            .subscribe(data => {
                this.applicationMetaData = data
                
                debugger;
            })


        //called after the constructor and called  after the first ngOnChanges() 
        if (this._routeParameterd.snapshot.params['id'] != null) {
            var id = this._routeParameterd.snapshot.params['id'];
            this.applicationService.getApplicationyId(id)
                .subscribe(data => {
                    this.applicationData = data

                    
                })
        }
    }
    initSubmit(applicationData: ApplicationData) {
         var startdate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
        var enddate = new Date(Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), this.endDate.getHours(), this.endDate.getMinutes(), this.endDate.getSeconds()));
        applicationData.startDate = startdate;
        applicationData.endDate = enddate;
        //applicationData.endDate = enddate;
        
        this.applicationService.addApplication(this.applicationData)
            .subscribe((result: boolean) => {
               var result = result;
            });
    }

    submit() {
        console.log('success!');
    }
    redirect() {

        if (confirm("Do you want Update")) {
            this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
        }
        else {
            this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
        }
    }
}