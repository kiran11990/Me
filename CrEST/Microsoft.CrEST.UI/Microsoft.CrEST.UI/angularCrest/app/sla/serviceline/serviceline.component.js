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
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Sservice } from "../shared/services/service.service";
var SlaServiceComponent = (function () {
    function SlaServiceComponent(Service) {
        this.Service = Service;
        this.sample = "";
        //Foreach(var x in ayyy)
        this.serviceline = "Sla Service";
        this.contactId = '';
        this.contractid = '';
        this.serviceLine = '';
        this.applicationgroup = '';
        this.states = [];
        this.supplier = '';
        this.contactdetails = [];
        this.contactIdList = [];
        this.servicelineList = [];
        this.ApplicationLists = [];
        this.SupplierList = [];
        this.serviceList = [];
        this.filteredList = [];
        this.ContactIdList = [];
        this.searchContactId = '';
        // public searchServiceLine = '';
        this.searchApplicationgroup = '';
        this.filter = '';
        this.maxSize = 7;
        this.directionLinks = true;
        this.autoHide = false;
        this.config = {
            id: 'advanced',
            itemsPerPage: 10,
            currentPage: 1
        };
        this.labels = {
            previousLabel: 'Previous',
            nextLabel: 'Next',
            screenReaderPaginationLabel: 'Pagination',
            screenReaderPageLabel: 'page',
            screenReaderCurrentLabel: "You're on page"
        };
        this.popped = [];
    }
    SlaServiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serviceList = [];
        this.Service.getService()
            .subscribe(function (data) {
            _this.serviceList = data;
            if (_this.serviceList) {
                _this.autoComplete();
            }
        });
    };
    SlaServiceComponent.prototype.find = function () {
        this.searchContactId = this.contractid.trim();
        //this.searchServiceLine = this.serviceLine.trim();
        this.searchApplicationgroup = this.applicationgroup.trim();
    };
    SlaServiceComponent.prototype.notifyContactId = function (contractid) {
        if (event) {
            this.contractid = contractid;
        }
    };
    SlaServiceComponent.prototype.notifyApplication = function (Service) {
        if (event) {
            this.applicationgroup = Service;
        }
    };
    SlaServiceComponent.prototype.autoComplete = function () {
        for (var i = 0; i < this.serviceList.length; i++) {
            this.ApplicationLists.push(this.serviceList[i].ApplicationGroup);
            this.contactIdList.push(this.serviceList[i].contractid);
        }
    };
    SlaServiceComponent.prototype.onPageChange = function (number) {
        console.log('change to page', number);
        this.config.currentPage = number;
    };
    SlaServiceComponent.prototype.pushItem = function () {
        var item = this.popped.pop() || 'A newly-created meal!';
        this.serviceList.push(item);
    };
    SlaServiceComponent.prototype.popItem = function () {
        this.popped.push(this.serviceList.pop());
    };
    return SlaServiceComponent;
}());
SlaServiceComponent = __decorate([
    Component({
        selector: 'sla-service',
        templateUrl: './serviceline.component.html'
    }),
    __metadata("design:paramtypes", [Sservice])
], SlaServiceComponent);
export { SlaServiceComponent };
//filter() {
//    if (this.query !== "") {
//        this.filteredList = this.countries.filter(function (el) {
//            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
//        }.bind(this));
//    } else {
//        this.filteredList = [];
//    }
//}
//select(item) {
//    this.query = item;
//    this.filteredList = [];
//}
//# sourceMappingURL=serviceline.component.js.map