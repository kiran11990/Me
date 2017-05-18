import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from "../shared/models/application";
import { ApplicationData } from "../shared/models/applicationdata";
import { ApplicationService } from "./../shared/services/application.service";
import { CommonModule } from '@angular/common';
import { IMyDateModel } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import { Http } from '@angular/http';

@Component({
    selector: 'sla-applicationForm',
    template: require('./application-form.component.html'),

})
export class ApplicationFormComponent implements OnInit {
    applicationList: Application = new Application();
    applicationData: ApplicationData = new ApplicationData();
    date: Date = new Date();
    submitAttempt = false;
    applicationForm: FormGroup;

    public outparam: string = '';
    public dropdownSettings = {};
    public myDate: string;
    constructor(private _route: ActivatedRoute, private applicationService: ApplicationService, private router: Router, formBuilder: FormBuilder, private http: Http) {
       

        this.applicationForm = formBuilder.group({
          
            'msowneralias': [null, Validators.required]



        })
        //this.myDate = '2016-01-10';

    }
    
     startDate: Object = {
        date: {
            year: this.date.getFullYear(),
            month: this.date.getMonth() + 1,
            day: this.date.getDate()
        }
    };

     convert(str: any) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}



    private endDate: Object = {
        date: {
            year: this.date.getFullYear(),
            month: this.date.getMonth() + 1,
            day: this.date.getDate()
        }
    };
    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };


    onstartDateChanged(event: IMyDateModel) {
        //debugger;
        //var result = this.convert(event.jsdate);
        //this.applicationData.startDate = event.jsdate;
        //alert(this.applicationData.startDate + "" +event.jsdate)
        
        
    }

    onendDateChanged(event: IMyDateModel) {
       
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
    ngOnInit() {
        //called after the constructor and called  after the first ngOnChanges() 
        if (this._route.snapshot.params['id'] != null) {
            var id = this._route.snapshot.params['id'];
            this.applicationService.getApplicationyId(id)
                .subscribe(data => {
                    this.applicationList = data
                    
                })
        }
    }
    initSubmit(applicationData: ApplicationData) {
        //this.submitAttempt = true;
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
        }
        else {
            this.router.navigate(['applications']);
        }
    }
}