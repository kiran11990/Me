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
    function ApplicationFormComponent(_route, applicationService, router, formBuilder, http) {
        this._route = _route;
        this.applicationService = applicationService;
        this.router = router;
        this.http = http;
        this.applicationList = new Application();
        this.applicationData = new ApplicationData();
        this.date = new Date();
        this.submitAttempt = false;
        this.outparam = '';
        this.dropdownSettings = {};
        this.startDate = {
            date: {
                year: this.date.getFullYear(),
                month: this.date.getMonth() + 1,
                day: this.date.getDate()
            }
        };
        this.endDate = {
            date: {
                year: this.date.getFullYear(),
                month: this.date.getMonth() + 1,
                day: this.date.getDate()
            }
        };
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
        };
        this.applicationForm = formBuilder.group({
            'msowneralias': [null, Validators.required]
        });
        //this.myDate = '2016-01-10';
    }
    ApplicationFormComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    };
    ApplicationFormComponent.prototype.onstartDateChanged = function (event) {
        //debugger;
        //var result = this.convert(event.jsdate);
        //this.applicationData.startDate = event.jsdate;
        //alert(this.applicationData.startDate + "" +event.jsdate)
    };
    ApplicationFormComponent.prototype.onendDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    ApplicationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        //called after the constructor and called  after the first ngOnChanges() 
        if (this._route.snapshot.params['id'] != null) {
            var id = this._route.snapshot.params['id'];
            this.applicationService.getApplicationyId(id)
                .subscribe(function (data) {
                _this.applicationList = data;
            });
        }
    };
    ApplicationFormComponent.prototype.initSubmit = function (applicationData) {
        //this.submitAttempt = true;
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
        }
        else {
            this.router.navigate(['applications']);
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