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
        this.supplierFlag = true;
        this.contractIdFlag = true;
        this.serviceClassFlag = true;
        this.runOrGrowFlag = true;
        this.itorgFlag = true;
        this.crestLvl1 = true;
        this.crestLvl2 = true;
        this.crestLvl3 = true;
        this.service = new Service();
        this.currencyPattern = /^[0-9]*$/;
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
            //'remarks': ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
            'remarks': ['', Validators.required],
            'itOrg': [''],
        });
    }
    ServicelineFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.currency = "USD";
        this.SericeMetaData();
        this.id = this.route.snapshot.params['id'];
        this.title = this.id ? 'Edit Service' : 'New Service';
        if (this.id != null) {
            this.Sservice.getServiceById(this.id)
                .subscribe(function (data) {
                _this.service = data;
            });
        }
    };
    ServicelineFormComponent.prototype.onitOrgChange = function (value) {
        if (value != undefined) {
            this.itorgFlag = false;
        }
        this.service.itorg = value;
    };
    ServicelineFormComponent.prototype.onChange = function (value) {
        if (value != undefined) {
            this.supplierFlag = false;
        }
        this.service.supplierId = value;
    };
    ServicelineFormComponent.prototype.onChancrestLevel1 = function (value) {
        if (value != undefined) {
            this.crestLvl1 = false;
        }
        this.service.crestLevel1Id = value;
    };
    ServicelineFormComponent.prototype.onChancrestLevel2 = function (value) {
        if (value != undefined) {
            this.crestLvl2 = false;
        }
        this.service.crestLevel2 = value;
    };
    ServicelineFormComponent.prototype.onChancrestLevel3 = function (value) {
        if (value != undefined) {
            this.crestLvl3 = false;
        }
        this.service.crestLevel3Id = value;
    };
    ServicelineFormComponent.prototype.onChangContractId = function (value) {
        if (value != undefined) {
            this.contractIdFlag = false;
        }
        this.service.contractId = value;
    };
    ServicelineFormComponent.prototype.SericeMetaData = function () {
        var _this = this;
        this.Sservice.getServiceMetaData()
            .subscribe(function (data) {
            _this.serviceMetaData = data;
        });
    };
    ServicelineFormComponent.prototype.onChangecurrency = function (value) {
        this.service.currency = value;
    };
    ServicelineFormComponent.prototype.redirect = function () {
        if (confirm("Do you want Update")) {
            return false;
        }
        else {
            this.router.navigate(['services', { servicetatus: "updatedsuccessfully" }]);
        }
        event.preventDefault();
    };
    ServicelineFormComponent.prototype.submitForm = function (service) {
        //applicationData.endDate = enddate;
        var _this = this;
        this.Sservice.addservice(this.service)
            .subscribe(function (result) {
            var result = result;
            if (result == 1) {
                _this.id ? alert(" Service Updated Successfully") : alert("Service Saved Successfully");
                _this.router.navigate(['services', { servicetatus: "updatedsuccessfully" }]);
            }
        });
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