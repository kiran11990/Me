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
    // public serviceData: string[] = [];
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
        //constructor(private http: Http, _router: Router, private Sservice: Sservice) {
        //    this.router = _router;
        this.serviceList = [];
        this.filteredList = [];
        this.ContactIdList = [];
        this.searchContactId = '';
        // public searchServiceLine = '';
        this.searchApplicationgroup = '';
    }
    SlaServiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serviceList = [];
        //this.serviceData = [];
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
    //edit(id: any) {
    //    alert(id + "the value should be")
    //    this.id = id;
    //    this.router.navigate(['/applications', this.id]);
    //}
    SlaServiceComponent.prototype.notifyContactId = function (contractid) {
        if (event) {
            this.contractid = contractid;
        }
    };
    //notifySupplier(supplier: string) {
    //    if (event) {
    //        this.supplier = supplier;
    //    }
    //}
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