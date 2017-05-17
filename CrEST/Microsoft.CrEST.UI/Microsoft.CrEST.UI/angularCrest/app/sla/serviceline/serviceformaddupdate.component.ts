import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sservice } from "../shared/services/service.service";
import { Service } from "../shared/models/service";
import { IMyDateModel } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';


@Component({
    selector: 'service-form',
    templateUrl: './serviceformaddupdate.component.html'
})

export class ServicelineFormComponent implements OnInit {
    date: Date = new Date();
    serviceForm: FormGroup;
    title: string;
    public serviceList: Service[] = [];
    public editServiceList: Service[] = [];

    public id: string = "";

    service: Service = new Service();

    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private Sservice: Sservice
    ) 
    {
        this.serviceForm = formBuilder.group({
            
            'msowneralias': [null, Validators.required],
            'serviceline': [null, Validators.required],
             'scid': [null, Validators.required]
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            //'contractid': [null, Validators.required],
            //'serviceline': [null, Validators.required],
            //'soweffectivedate': [null, Validators.required], //Date
            //'sowexpirationdate': [null, Validators.required], //Date
            //'msowneralias': [null, Validators.required],
            //'servicecatalogno': [null, Validators.required,],
            ////'servicecatalogno': ['', ],
            //'poyr1': [null, Validators.required], //Number
            //'currency': [null, Validators.required],
            ////'sowAmountYr1': [null, Validators.required, Validators.pattern('^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$')], //currency
            ////'sowAmountYr2': ['', Validators.pattern('/^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$')],//currency
            ////'sowAmountYr3': ['', Validators.pattern('/^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$')],//currency
            ////'sowAmountYr4': ['', Validators.pattern('/^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$')],//currency
            //'sowAmountYr1': [null, Validators.required], //currency
            //'sowAmountYr2': [''],//currency
            //'sowAmountYr3': [''],//currency
            //'sowAmountYr4': [''],//currency

            //'iscrest': ['', Validators.required],
            //'remark': [''],
            //'ssolead': [''],
            //'ssovalidated': [''],
            //'companycode': ['', Validators.required]
        });
    }

    

    ngOnInit() {
        if (this.route.snapshot.params['id'] != null) {
            this.id = this.route.snapshot.params['id'];
            this.Sservice.getService()
                .subscribe(data => {
                    this.serviceList = data
                    if (this.serviceList) {
                        this.getServiceListbyID()
                    }
                })
        }
        else {

        }
    }
    getServiceListbyID() {
        for (var i = 0; i < this.serviceList.length; i++) {
            if (this.serviceList[i].contractid == this.route.snapshot.params['id']) {
                this.service = this.serviceList[i];
            }
        }
    }


    submitAttempt = false;

    initSubmit() {
        this.submitAttempt = true;
    }

    submit() {
        console.log('success!');
    }

    private startDte: Object = {
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
    }


    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };


    onstartDateChanged(event: IMyDateModel) {
        alert(event.formatted)
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }

    onendDateChanged(event: IMyDateModel) {
        alert(event.formatted)
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
    redirect() {
        if (confirm("Do you want Update")) {
        }
        else {
            this.router.navigate(['services']);
        }
    }
    save() {
        var result,
            sowValue = this.serviceForm.value;

        if (sowValue.id) {
            result = this.Sservice.updateSow(sowValue);
        } else {
            result = this.Sservice.addSow(sowValue);
        }
        this.router.navigate(['services']);
    }
}
