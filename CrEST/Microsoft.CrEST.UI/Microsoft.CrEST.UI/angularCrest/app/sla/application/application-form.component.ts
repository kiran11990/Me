import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from "../shared/models/application";
import { DropdownList } from "../shared/models/dropdownlist";
import { SelectedItems } from "../shared/models/selecteditems";
import { ApplicationService } from "./../shared/services/application.service";
import { CommonModule } from '@angular/common';
import { IMyDateModel } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';


@Component({
    selector: 'sla-applicationForm',
    template: require('./application-form.component.html'),

})
export class ApplicationFormComponent implements OnInit {
    applicationList: Application = new Application();
    public dropdownList: DropdownList[] = [];
    date: Date = new Date();
    submitAttempt = false;
    applicationForm: FormGroup;

    public outparam: string = '';
    public selectedItems: SelectedItems[] = [];
    public dropdownSettings = {};
    public myDate: string;
    constructor(private _route: ActivatedRoute, private applicationService: ApplicationService, private router: Router, formBuilder: FormBuilder,) {
       

        this.applicationForm = formBuilder.group({
          
            'msowneralias': [null, Validators.required]



        })
        //this.myDate = '2016-01-10';

    }
    
    private startDate: Object = {
        date: {
            year: this.date.getFullYear(),
            month: this.date.getMonth() + 1,
            day: this.date.getDate()
        }
    };

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
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }

    onendDateChanged(event: IMyDateModel) {
       
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
    ngOnInit() {
        //called after the constructor and called  after the first ngOnChanges() 
        if (this._route.snapshot.params['id'] != null) {
            this.applicationService.getApplications()
                .subscribe(data => {
                    this.applicationList = data
                    
                })
        }
    }
    initSubmit() {
        this.submitAttempt = true;
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