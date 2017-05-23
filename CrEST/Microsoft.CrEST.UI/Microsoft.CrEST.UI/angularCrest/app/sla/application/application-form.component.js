var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from "../shared/models/application";
import { ApplicationData } from "../shared/models/applicationdata";
import { ApplicationService } from "./../shared/services/application.service";
import { Http } from '@angular/http';
var ApplicationFormComponent = (function () {
    function ApplicationFormComponent(_routeParameterd, applicationService, router, formBuilder, http) {
        this._routeParameterd = _routeParameterd;
        this.applicationService = applicationService;
        this.router = router;
        this.http = http;
        this.applicationList = new Application();
        this.applicationData = new ApplicationData();
        this.startdate = new Date();
        this.submitAttempt = false;
        this.outparam = '';
        this.dropdownSettings = {};
        // startdate: Object = {
        //    date: {
        //        year: this.date.getFullYear(),
        //        month: this.date.getMonth() + 1,
        //        day: this.date.getdate()
        //    }
        //};
        //private enddate: Object = {
        //    date: {
        //        year: this.date.getFullYear(),
        //        month: this.date.getMonth() + 1,
        //        day: this.date.getdate()
        //    }
        //};
        this.mydatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
        };
        this.applicationForm = formBuilder.group({
            'msowneralias': [null, Validators.required]
        });
        //this.mydate = '2016-01-10';
    }
    ApplicationFormComponent.prototype.onstartdateChanged = function (event) {
        this.startdate = event.jsdate;
    };
    ApplicationFormComponent.prototype.onenddateChanged = function (event) {
        this.date = event.jsdate;
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    ApplicationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        //called after the constructor and called  after the first ngOnChanges() 
        if (this._routeParameterd.snapshot.params['id'] != null) {
            var id = this._routeParameterd.snapshot.params['id'];
            this.applicationService.getApplicationyId(id)
                .subscribe(function (data) {
                _this.applicationList = data;
            });
        }
    };
    ApplicationFormComponent.prototype.initSubmit = function (applicationData) {
        var now = new Date(this.startdate);
        var startdate = new Date(Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), this.startdate.getHours(), this.date.getMinutes(), this.startdate.getSeconds()));
        //var enddate = new date(date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getdate(), this.date.getHours(), this.date.getMinutes(), this.date.getSeconds()));
        applicationData.startDate = startdate;
        //applicationData.endDate = enddate;
        this.applicationService.addApplication(this.applicationData)
            .subscribe(function (result) {
            var result = result;
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