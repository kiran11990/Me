import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sservice } from "../shared/services/service.service";
import { Service } from "../shared/models/service";
//import { IMyDateModel } from 'mydatepicker';
//import { IMyDpOptions } from 'mydatepicker';


@Component({
    selector: 'service-form',
    templateUrl: './serviceformaddupdate.component.html'
})

export class ServicelineFormComponent implements OnInit {
    // date: Date = new Date();
    serviceForm: FormGroup;
    title: string;
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
            'contractid': ['', Validators.required],
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
            'remarks': ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
            'itOrg': ['']
        });
    }



    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.title = this.id ? 'Edit Service' : 'New Service';
        //alert(this.title);
        if (this.title == "Edit Service") {
            if (this.id != null) {
                //if (this.route.snapshot.params['id'] != null) {
                //    this.id = this.route.snapshot.params['id'];
                this.Sservice.getServiceById(this.id)
                    .subscribe(data => {
                        this.serviceList = data
                       
                    })
            }
            else {

            }
        }
    }
    //getServiceListbyID() {
    //    for (var i = 0; i < this.serviceList.length; i++) {
    //        if (this.serviceList[i].contractid == this.route.snapshot.params['id']) {
    //            this.service = this.serviceList[i];
    //        }
    //    }
    //}


    //submitAttempt = false;

    //initSubmit() {
    //    this.submitAttempt = true;
    //}

    //submit() {
    //    console.log('success!');
    //}

    //private startDte: Object = {
    //    date: {
    //        year: this.date.getFullYear(),
    //        month: this.date.getMonth() + 1,
    //        day: this.date.getDate()
    //    }
    //};
    //private endDate: Object = {
    //    date: {
    //        year: this.date.getFullYear(),
    //        month: this.date.getMonth() + 1,
    //        day: this.date.getDate()
    //    }
    //}


    //private myDatePickerOptions: IMyDpOptions = {
    //    // other options...
    //    dateFormat: 'dd.mm.yyyy',
    //};


    //onstartDateChanged(event: IMyDateModel) {
    //    alert(event.formatted)
    //    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    //}

    //onendDateChanged(event: IMyDateModel) {
    //    alert(event.formatted)
    //    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    //}
    //redirect() {
    //    if (confirm("Do you want Update")) {
    //    }
    //    else {
    //        this.router.navigate(['services']);
    //    }
    //}

    BackClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.router.navigateByUrl('/services');
    }

    submitForm(serviceformvalue: any) {
        console.log(serviceformvalue);
      
    }

}
