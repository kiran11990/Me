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
        this.serviceMetaData = [];
        this.serviceList = [];
        this.editServiceList = [];
        this.id = "";
        this.service = new Service();
        this.currencyPattern = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/;
        this.serviceForm = formBuilder.group({
            'supplier': ['', Validators.required],
            'SCID': ['', Validators.required],
            'contractId': ['', Validators.required],
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
    ServicelineFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.SericeMetaData();
        this.id = this.route.snapshot.params['id'];
        this.title = this.id ? 'Edit Service' : 'New Service';
        if (this.title == "Edit Service") {
            if (this.id != null) {
                this.Sservice.getServiceById(this.id)
                    .subscribe(function (data) {
                    _this.serviceList = data;
                });
            }
            else {
            }
        }
    };
    ServicelineFormComponent.prototype.SericeMetaData = function () {
        var _this = this;
        this.Sservice.getServiceMetaData()
            .subscribe(function (data) {
            debugger;
            _this.serviceMetaData = data;
        });
    };
    ServicelineFormComponent.prototype.redirect = function () {
        if (confirm("Do you want Update")) {
            this.router.navigate(['services', { sowStatus: "updatedsuccessfully" }]);
        }
        else {
            this.router.navigate(['services', { sowStatus: "updatedsuccessfully" }]);
        }
        event.preventDefault();
    };
    ServicelineFormComponent.prototype.submitForm = function (serviceformvalue) {
        console.log(serviceformvalue);
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