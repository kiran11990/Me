var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../shared/models/applicationmetadata.ts" />
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from "../shared/models/application";
import { ApplicationData } from "../shared/models/applicationdata";
import { ApplicationService } from "./../shared/services/application.service";
import { Http } from '@angular/http';
var ApplicationFormComponent = (function () {
    function ApplicationFormComponent(_routeParams, applicationService, router, formBuilder, http) {
        this._routeParams = _routeParams;
        this.applicationService = applicationService;
        this.router = router;
        this.http = http;
        this.applicationList = new Application();
        this.applicationData = new ApplicationData();
        this.startdate = new Date();
        this.endDate = new Date();
        this.submitAttempt = false;
        this.applicationMetaData = [];
        //public runvsgrow: number[] = [];
        this.outparam = '';
        this.dropdownSettings = {};
        this.runOrGrow = [];
        this.startDate = {
            date: {
                year: this.startdate.getFullYear(),
                month: this.startdate.getMonth() + 1,
                day: this.startdate.getDate()
            }
        };
        this.enddate = {
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
        this.applicationForm = formBuilder.group({
            'supplier': ['', Validators.required],
            'contactId': ['', Validators.required],
            'serviceline': ['', Validators.required],
            'Application': ['', Validators.required],
            'OwnerAlias': ['', Validators.required],
            'Serviceclass': [''],
            'Runvsgrow': ['', Validators.required],
            'ApplicationGroup': ['', Validators.required],
            'startDate': ['', Validators.required],
            'endDate': ['', Validators.required],
            'endtoend': ['Y'],
            'epm': ['Y'],
            'tm': ['', Validators.pattern(/^\d+[.]?\d*%?$/)],
            'ManagedCapacity': ['', Validators.pattern(/^\d+[.]?\d*%?$/)],
            'ManagedServices': ['', Validators.pattern(/^\d+[.]?\d*%?$/)],
            'Software': ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
            'remarks': ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
            'sowId': ['', Validators.required],
            'itOrg': ['']
        });
        //this.mydate = '2016-01-10';
    }
    ApplicationFormComponent.prototype.onstartDateChanged = function (event) {
        this.startdate = event.jsdate;
    };
    ApplicationFormComponent.prototype.onendDateChanged = function (event) {
        this.endDate = event.jsdate;
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    ApplicationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        if (this._routeParams.snapshot.params['id'] != null) {
            var id = this._routeParams.snapshot.params['id'];
            this.applicationService.getApplicationbyId(id)
                .subscribe(function (data) {
                _this.applicationData = data;
                var datepickerEndDate = new Date(_this.applicationData.endDate);
                var datepickerStartDate = new Date(_this.applicationData.startDate);
                _this.enddate = {
                    date: {
                        year: datepickerEndDate.getFullYear(),
                        month: datepickerEndDate.getMonth() + 1,
                        day: datepickerEndDate.getDate()
                    },
                };
                _this.startDate = {
                    date: {
                        year: datepickerStartDate.getFullYear(),
                        month: datepickerStartDate.getMonth() + 1,
                        day: datepickerStartDate.getDate()
                    },
                };
            });
        }
    };
    ApplicationFormComponent.prototype.getApplicationMetaData = function () {
        var _this = this;
        this.applicationService.getApplicationMetaData()
            .subscribe(function (data) {
            _this.applicationMetaData = data;
        });
    };
    ApplicationFormComponent.prototype.initSubmit = function (applicationData) {
        var _this = this;
        var startdate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.startdate.getMinutes(), this.startdate.getSeconds()));
        var enddate = new Date(Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), this.endDate.getHours(), this.endDate.getMinutes(), this.endDate.getSeconds()));
        applicationData.startDate = startdate;
        applicationData.endDate = enddate;
        //applicationData.endDate = enddate;
        this.applicationService.addApplication(this.applicationData)
            .subscribe(function (result) {
            var result = result;
            if (result == 1) {
                //alert("updatedsuccessfully")
                _this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
            }
        });
    };
    ApplicationFormComponent.prototype.submit = function () {
        console.log('success!');
    };
    ApplicationFormComponent.prototype.redirect = function () {
        if (confirm("Do you want Update")) {
            this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
        }
        else {
            this.router.navigate(['applications', { applicationStatus: "updatedsuccessfully" }]);
        }
    };
    return ApplicationFormComponent;
}());
ApplicationFormComponent = __decorate([
    Component({
        selector: 'sla-applicationForm',
        template: require('./application-form.component.html'),
    }),
    __metadata("design:paramtypes", [ActivatedRoute, ApplicationService, Router, FormBuilder, Http])
], ApplicationFormComponent);
export { ApplicationFormComponent };
//# sourceMappingURL=application-form.component.js.map