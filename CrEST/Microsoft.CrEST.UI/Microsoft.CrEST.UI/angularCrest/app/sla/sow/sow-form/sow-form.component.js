var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../shared/services/application.service.ts" />
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { CustomValidators } from 'ng2-validation';
import { Sow } from '../../shared/models/sow';
import { ApplicationMetaData } from "../../shared/models/applicationmetadata";
import { SowService } from '../../shared/services/sows.service';
var SowFormComponent = (function () {
    function SowFormComponent(formBuilder, router, route, SowService) {
        this.router = router;
        this.route = route;
        this.SowService = SowService;
        this.effectiveDate = new Date();
        this.expirationDate = new Date();
        this.sowMetaData = new ApplicationMetaData();
        this.sow = new Sow();
        //private sow: Sow[] = [];
        this.startdate = new Date();
        this.enddate = new Date();
        this.currencyPattern = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/;
        this.soweffectiveDate = {
            date: {
                year: this.startdate.getFullYear(),
                month: this.startdate.getMonth() + 1,
                day: this.startdate.getDate()
            }
        };
        this.sowexpirationDate = {
            date: {
                year: this.startdate.getFullYear(),
                month: this.startdate.getMonth() + 1,
                day: this.startdate.getDate()
            }
        };
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
        };
        this.sowForm = formBuilder.group({
            'supplierId': ['', Validators.required],
            'contractId': ['', Validators.required],
            'itorg': ['', Validators.required],
            'soweffectiveDate': ['', Validators.required],
            'sowexpirationDate': ['', Validators.required],
            'msowner': [null, Validators.required],
            'servicecatalogno': ['', Validators.required],
            'ponumYear1': ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            'currency': [''],
            'sowamountYear2': ['', Validators.pattern(/^\$?[0-9]+(\.[0-9][0-9])?$/)],
            'sowamountYear3': ['', Validators.pattern(this.currencyPattern)],
            'sowamountYear4': ['', Validators.pattern(this.currencyPattern)],
            'iscrest': ['', Validators.required],
            'remark': [''],
            'infyOwner': [''],
            'companycode': ['', Validators.required]
        });
        this.sow.soweffectiveDate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
        this.sow.sowexpirationDate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
    }
    SowFormComponent.prototype.onChange = function (value) {
        this.sow.supplierId = value;
    };
    SowFormComponent.prototype.onContactChange = function (value) {
        this.sow.contractId = value;
    };
    SowFormComponent.prototype.onChangeComponeyCode = function (value) {
        this.sow.companyCode = value;
    };
    SowFormComponent.prototype.onitorgChange = function (value) {
        this.sow.itorg = value;
    };
    SowFormComponent.prototype.onChangecurrency = function (value) {
        this.sow.currency = value;
    };
    SowFormComponent.prototype.oneffectiveDateChanged = function (event) {
        this.effectiveDate = event.jsdate;
    };
    SowFormComponent.prototype.onexpirationDateChanged = function (event) {
        this.expirationDate = event.jsdate;
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    SowFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sow.currency = "USD";
        this.getApplicationMetaData();
        this.id = this.route.snapshot.params['id'];
        this.title = this.id ? 'Edit Sow' : 'New Sow';
        this.routeID = this.route.snapshot.params['id'];
        if (this.title == "Edit Sow") {
            this.SowService.getSowById(this.route.snapshot.params['id'])
                .subscribe(function (data) {
                _this.sow = data;
                var soweffectiveDate = new Date(_this.sow.soweffectiveDate);
                var sowexpirationDate = new Date(_this.sow.sowexpirationDate);
                _this.sowexpirationDate = {
                    date: {
                        year: sowexpirationDate.getFullYear(),
                        month: sowexpirationDate.getMonth() + 1,
                        day: sowexpirationDate.getDate()
                    },
                };
                _this.soweffectiveDate = {
                    date: {
                        year: soweffectiveDate.getFullYear(),
                        month: soweffectiveDate.getMonth() + 1,
                        day: soweffectiveDate.getDate()
                    },
                };
            });
        }
    };
    SowFormComponent.prototype.getApplicationMetaData = function () {
        var _this = this;
        this.SowService.getsowMetaData()
            .subscribe(function (data) {
            _this.sowMetaData = data;
        });
    };
    SowFormComponent.prototype.submitForm = function (sow) {
        var _this = this;
        sow.soweffectiveDate = new Date(Date.UTC(this.effectiveDate.getFullYear(), this.effectiveDate.getMonth(), this.effectiveDate.getDate(), this.effectiveDate.getHours(), this.effectiveDate.getMinutes(), this.effectiveDate.getSeconds()));
        sow.sowexpirationDate = new Date(Date.UTC(this.expirationDate.getFullYear(), this.expirationDate.getMonth(), this.expirationDate.getDate(), this.expirationDate.getHours(), this.expirationDate.getMinutes(), this.expirationDate.getSeconds()));
        //applicationData.endDate = enddate;
        this.SowService.addSow(this.sow)
            .subscribe(function (result) {
            var result = result;
            if (result == 1) {
                _this.route.snapshot.params['id'] ? alert("updatedsuccessfully") : alert("sow added successfully");
                _this.router.navigate(['sows', { sowStatus: "updatedsuccessfully" }]);
            }
        });
    };
    SowFormComponent.prototype.redirect = function () {
        if (confirm("Do you want Update")) {
            this.router.navigate(['sows', { sowStatus: "updatedsuccessfully" }]);
        }
        else {
            this.router.navigate(['applications', { sowStatus: "updatedsuccessfully" }]);
        }
    };
    SowFormComponent.prototype.BackClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.router.navigateByUrl('/sows');
    };
    return SowFormComponent;
}());
SowFormComponent = __decorate([
    Component({
        selector: 'sow-form',
        templateUrl: './sow-form.component.html'
    }),
    __metadata("design:paramtypes", [FormBuilder,
        Router,
        ActivatedRoute,
        SowService])
], SowFormComponent);
export { SowFormComponent };
//# sourceMappingURL=sow-form.component.js.map