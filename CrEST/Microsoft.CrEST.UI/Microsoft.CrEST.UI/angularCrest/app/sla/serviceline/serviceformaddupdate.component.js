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
import { Sservice } from "../shared/services/service.service";
import { Service } from "../shared/models/service";
var ServicelineFormComponent = (function () {
    function ServicelineFormComponent(formBuilder, router, route, Sservice) {
        this.router = router;
        this.route = route;
        this.Sservice = Sservice;
        this.date = new Date();
        this.serviceList = [];
        this.editServiceList = [];
        this.id = "";
        this.service = new Service();
        this.submitAttempt = false;
        this.model = {
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
        this.serviceForm = formBuilder.group({
            'msowneralias': [null, Validators.required],
            'serviceline': [null, Validators.required],
            'scid': [null, Validators.required]
        });
    }
    ServicelineFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot.params['id'] != null) {
            this.id = this.route.snapshot.params['id'];
            this.Sservice.getService()
                .subscribe(function (data) {
                _this.serviceList = data;
                if (_this.serviceList) {
                    _this.getServiceListbyID();
                }
            });
        }
        else {
        }
    };
    ServicelineFormComponent.prototype.getServiceListbyID = function () {
        for (var i = 0; i < this.serviceList.length; i++) {
            if (this.serviceList[i].contractid == this.route.snapshot.params['id']) {
                this.service = this.serviceList[i];
            }
        }
    };
    ServicelineFormComponent.prototype.initSubmit = function () {
        this.submitAttempt = true;
    };
    ServicelineFormComponent.prototype.submit = function () {
        console.log('success!');
    };
    ServicelineFormComponent.prototype.onDateChanged = function (event) {
        alert(event.formatted);
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    ServicelineFormComponent.prototype.redirect = function () {
        if (confirm("Do you want Update")) {
        }
        else {
            this.router.navigate(['services']);
        }
    };
    ServicelineFormComponent.prototype.save = function () {
        var result, sowValue = this.serviceForm.value;
        if (sowValue.id) {
            result = this.Sservice.updateSow(sowValue);
        }
        else {
            result = this.Sservice.addSow(sowValue);
        }
        this.router.navigate(['services']);
    };
    return ServicelineFormComponent;
}());
ServicelineFormComponent = __decorate([
    Component({
        selector: 'service-form',
        templateUrl: './serviceformaddupdate.component.html'
    }),
    __metadata("design:paramtypes", [FormBuilder,
        Router,
        ActivatedRoute,
        Sservice])
], ServicelineFormComponent);
export { ServicelineFormComponent };
//# sourceMappingURL=serviceformaddupdate.component.js.map