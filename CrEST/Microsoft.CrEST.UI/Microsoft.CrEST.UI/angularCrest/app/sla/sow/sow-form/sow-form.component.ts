/// <reference path="../../shared/services/application.service.ts" />
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { CustomValidators } from 'ng2-validation';
import { Sow } from '../../shared/models/sow';
import { ApplicationMetaData } from "../../shared/models/applicationmetadata";
import { SowMetaData } from "../../shared/models/sowMetaData";
import { SowService } from '../../shared/services/sows.service';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
@Component({
    selector: 'sow-form',
    templateUrl: './sow-form.component.html'
})

export class SowFormComponent implements OnInit {

    sowForm: FormGroup;
    title: string;
    effectiveDate: Date = new Date();
    expirationDate: Date = new Date();
    sowMetaData: SowMetaData = new SowMetaData();
    sow: Sow = new Sow();
    //private sow: Sow[] = [];
    startdate: Date = new Date();
    enddate: Date = new Date();
    public id: number;

    public routeID: number;
    private currencyPattern = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/;
    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private SowService: SowService,
    ) {


        this.sowForm = formBuilder.group({
            
            'supplierId': ['', Validators.required],
            'contractId': ['', Validators.required],
            'itorg': ['', Validators.required],
            'soweffectiveDate': ['', Validators.required], //Date
            'sowexpirationDate': ['', Validators.required], //Date
            'msowner': [null, Validators.required],
            'servicecatalogno': ['', Validators.required],
            'ponumYear1': ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], //Number
            'currency': [''],

            'sowamountYear2': ['', Validators.pattern(/^\$?[0-9]+(\.[0-9][0-9])?$/)],/*.pattern(this.currencyPattern)],*/
            'sowamountYear3': ['', Validators.pattern(this.currencyPattern)],/*.pattern(this.currencyPattern)],*/
            'sowamountYear4': ['', Validators.pattern(this.currencyPattern)],/*.pattern(this.currencyPattern)],*/
            'iscrest': ['', Validators.required],
            'remark': [''],
            'infyOwner': [''],
            'companycode': ['', Validators.required]
        });

        this.sow.soweffectiveDate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
        this.sow.sowexpirationDate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
    }



   

    onChange(value: any) {
        this.sow.supplierId = value;
    }

    onContactChange(value: any) {
        this.sow.contractId = value;

    }
    onChangeComponeyCode(value: any) {
        this.sow.companyCode = value;
    }
    onitorgChange(value: number) {
        this.sow.itorg = value;

    }
    onChangecurrency(value: any) {
        this.sow.currency = value;
    }
    private soweffectiveDate: Object = {
        date: {
            year: this.startdate.getFullYear(),
            month: this.startdate.getMonth() + 1,
            day: this.startdate.getDate()
        }
    };

   

    private sowexpirationDate: Object = {
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


    oneffectiveDateChanged(event: IMyDateModel) {
        this.effectiveDate = event.jsdate;
    }

    onexpirationDateChanged(event: IMyDateModel) {
        this.expirationDate = event.jsdate;
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
    


    ngOnInit() {
        this.sow.currency="USD"
        this.getApplicationMetaData();
        this.id = this.route.snapshot.params['id'];
        this.title = this.id ? 'Edit Sow' : 'New Sow';
        this.routeID = this.route.snapshot.params['id'];
        if (this.title == "Edit Sow") {

            this.SowService.getSowById(this.route.snapshot.params['id'])
                .subscribe(data => {
                    this.sow = data
                    var soweffectiveDate = new Date(this.sow.soweffectiveDate);
                    var sowexpirationDate = new Date(this.sow.sowexpirationDate);
                    this.sowexpirationDate = <IMyDateModel>{
                        date: {
                            year: sowexpirationDate.getFullYear(),
                            month: sowexpirationDate.getMonth() + 1,
                            day: sowexpirationDate.getDate()
                        },
                    }
                    this.soweffectiveDate = <IMyDateModel>{
                        date: {
                            year: soweffectiveDate.getFullYear(),
                            month: soweffectiveDate.getMonth() + 1,
                            day: soweffectiveDate.getDate()
                        },

                    }

                });
        }

    }
    
    getApplicationMetaData() {
        this.SowService.getsowMetaData()
            .subscribe(data => {
                this.sowMetaData = data;
            })
    }
  


    submitForm(sow: Sow) {
        sow.soweffectiveDate = new Date(Date.UTC(this.effectiveDate.getFullYear(), this.effectiveDate.getMonth(), this.effectiveDate.getDate(), this.effectiveDate.getHours(), this.effectiveDate.getMinutes(), this.effectiveDate.getSeconds()));
        sow.sowexpirationDate = new Date(Date.UTC(this.expirationDate.getFullYear(), this.expirationDate.getMonth(), this.expirationDate.getDate(), this.expirationDate.getHours(), this.expirationDate.getMinutes(), this.expirationDate.getSeconds()));
        //applicationData.endDate = enddate;

        this.SowService.addSow(this.sow)
            .subscribe((result: number) => {
                var result = result;
                if (result == 1) {
                    this.route.snapshot.params['id']? alert("updatedsuccessfully") : alert("sow added successfully")
                  this.router.navigate(['sows', {sowStatus: "updatedsuccessfully" }]);
                }
            });
    }

    redirect() {

        if (confirm("Do you want Update")) {
            this.router.navigate(['sows', { sowStatus: "updatedsuccessfully" }]);
        }
        else {
            this.router.navigate(['applications', { sowStatus: "updatedsuccessfully" }]);
        }
    }

    BackClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.router.navigateByUrl('/sows');
    }
}
