import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from "../shared/models/application";
import { ApplicationService } from "./../shared/services/application.service";
import { CommonModule } from '@angular/common';
@Component({
    selector: 'sla-applicationForm',
    template: require('./application-form.component.html'),

})
export class ApplicationFormComponent {
    applicationList: Application = new Application();
    submitAttempt = false;
    applicationForm: FormGroup;

    public outparam: string = '';
    
    public myDate: string;
    constructor(private _route: ActivatedRoute, private applicationService: ApplicationService, private router: Router, formBuilder: FormBuilder,) {
       

        this.applicationForm = formBuilder.group({
          
            'msowneralias': [null, Validators.required]



        })
        //this.myDate = '2016-01-10';

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
            debugger;
            this.router.navigate(['applications']);
        }
    }
}