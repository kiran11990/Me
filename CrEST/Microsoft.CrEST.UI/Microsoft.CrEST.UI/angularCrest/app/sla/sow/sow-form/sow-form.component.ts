/// <reference path="../../shared/services/application.service.ts" />
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sow } from '../../shared/models/sow';
import { ApplicationMetaData } from "../../shared/models/applicationmetadata";
import { RunOrGrow } from "../../shared/models/applicationmetadata";
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
    sowMetaData: ApplicationMetaData = new ApplicationMetaData();
    sow: Sow = new Sow();
    //private sow: Sow[] = [];
    startdate: Date = new Date();
    enddate: Date = new Date();
    public id: number;
    public supplierFlag: boolean = true;
    public contractIdFlag: boolean = true;
    public itorgFlag: boolean = true;
    public routeID: number;
    //private currencyPattern = /^\$\d+[\.]*[\d]*$/;
	private currencyPattern = /^(\d+(\.\d*)?)$/;;
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
            'sowamountYear1': ['', Validators.pattern(this.currencyPattern)],
            'sowamountYear2': ['', Validators.pattern(this.currencyPattern)],/*.pattern(this.currencyPattern)],*/
            'sowamountYear3': ['', Validators.pattern(this.currencyPattern)],/*.pattern(this.currencyPattern)],*/
            'sowamountYear4': ['', Validators.pattern(this.currencyPattern)],/*.pattern(this.currencyPattern)],*/
            'iscrest': [null, Validators.required],
            'remark': [''],
            'infyOwner': [''],
            'companycode': ['', Validators.required]
        });

        this.sow.soweffectiveDate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
        this.sow.sowexpirationDate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
    }



   

    onChange(value: any) {
        if (value != undefined) {
            this.supplierFlag = false;
        }
        this.sow.supplierId = value;
    }

    onContactChange(value: any) {
        if (value != undefined) {
            this.contractIdFlag = false;
        }
        this.sow.contractId = value;

    }
    onChangeComponeyCode(value: any) {
        this.sow.companyCode = value;
    }
    onitorgChange(value: number) {
        if (value != undefined) {
            this.itorgFlag = false;
        }
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
                    this.route.snapshot.params['id']? alert("sow updated successfully") : alert("sow added successfully")
                  this.router.navigate(['sows', {sowStatus: "updatedsuccessfully" }]);
                }
            });
    }

    redirect() {
        if (this.sowForm.dirty) {
            if (confirm("Are you sure you want to leave this page?")) {
                this.router.navigate(['/home/sows', { sowStatus: "updatedsuccessfully" }]);
            }
            else
                this.router.navigate(['/home/sows']);
        }
        else
        {
            this.router.navigate(['/home/sows']);
        }
       
    }

    BackClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();
		this.router.navigateByUrl('/home/sows');
    }
}
