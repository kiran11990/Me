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
import { ApplicationService } from "./../shared/services/application.service";
var ApplicationFormComponent = (function () {
    function ApplicationFormComponent(_route, applicationService, router, formBuilder) {
        this._route = _route;
        this.applicationService = applicationService;
        this.router = router;
        this.applicationList = new Application();
        this.submitAttempt = false;
        this.outparam = '';
        this.applicationForm = formBuilder.group({
            'msowneralias': [null, Validators.required]
        });
        //this.myDate = '2016-01-10';
    }
    ApplicationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        //called after the constructor and called  after the first ngOnChanges() 
        if (this._route.snapshot.params['id'] != null) {
            this.applicationService.getApplications()
                .subscribe(function (data) {
                _this.applicationList = data;
            });
        }
    };
    ApplicationFormComponent.prototype.initSubmit = function () {
        this.submitAttempt = true;
    };
    ApplicationFormComponent.prototype.submit = function () {
        console.log('success!');
    };
    ApplicationFormComponent.prototype.redirect = function () {
        if (confirm("Do you want Update")) {
        }
        else {
            debugger;
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
    __metadata("design:paramtypes", [ActivatedRoute, ApplicationService, Router, FormBuilder])
], ApplicationFormComponent);
export { ApplicationFormComponent };
//# sourceMappingURL=application-form.component.js.map