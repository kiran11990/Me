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
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SowService } from "../../shared/services/sows.service";
var SowComponent = (function () {
    function SowComponent(sowService, _routeParameterd) {
        this.sowService = sowService;
        this._routeParameterd = _routeParameterd;
        this.sows = [];
        this.contractid = '';
        this.serviceLine = '';
        this.msOwnerAlias = '';
        this.contractID = '';
        this.application = '';
        this.owneralias = '';
        this.contractIDList = [];
        this.ItOrgList = [];
        this.msOwnerAliasList = [];
        this.effectiveDate = new Date();
        this.expirationDate = new Date();
        this.soweffectiveDates = new Date();
        this.sowexpirationDates = new Date();
        this.searchContractId = '';
        this.searchServiceLine = '';
        this.searchMsowner = '';
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
        };
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
    SowComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._routeParameterd.snapshot.params['sowStatus']) {
        }
        this.sowService.getSows()
            .subscribe(function (data) {
            _this.sows = data;
            if (_this.sows) {
                _this.autoComplete();
            }
        });
    };
    SowComponent.prototype.oneffectiveDateChanged = function (event) {
        this.effectiveDate = event.jsdate;
    };
    SowComponent.prototype.onexpirationDateChanged = function (event) {
        this.expirationDate = event.jsdate;
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    SowComponent.prototype.find = function () {
        var _this = this;
        //this.soweffectiveDates = new Date(Date.UTC(this.effectiveDate.getFullYear(), this.effectiveDate.getMonth(), this.effectiveDate.getDate(), this.effectiveDate.getHours(), this.effectiveDate.getMinutes(), this.effectiveDate.getSeconds()));
        //this.sowexpirationDates = new Date(Date.UTC(this.expirationDate.getFullYear(), this.expirationDate.getMonth(), this.expirationDate.getDate(), this.expirationDate.getHours(), this.expirationDate.getMinutes(), this.expirationDate.getSeconds()));
        this.sowService.findSow(this.contractID, this.ItOrg, this.msOwnerAlias, this.effectiveDate.toUTCString(), this.expirationDate.toUTCString())
            .subscribe(function (data) {
            _this.sows = data;
        });
    };
    SowComponent.prototype.deleteSow = function (sow) {
        var _this = this;
        if (confirm("Are you sure you want to delete " + sow.name + "?")) {
            var index = this.sows.indexOf(sow);
            this.sows.splice(index, 1);
            this.sowService.deleteSow(sow.id)
                .subscribe(null, function (err) {
                alert("Could not delete sow.");
                // Revert the view back to its original state
                _this.sows.splice(index, 0, sow);
            });
        }
    };
    SowComponent.prototype.notifyContractId = function (contractID) {
        if (event) {
            this.contractID = contractID;
        }
    };
    SowComponent.prototype.notifyItOrg = function (ItOrg) {
        if (event) {
            this.itOrg = ItOrg;
        }
    };
    SowComponent.prototype.notifymsOwnerAlias = function (msOwnerAlias) {
        if (event) {
            this.msOwnerAlias = msOwnerAlias;
        }
    };
    SowComponent.prototype.autoComplete = function () {
        for (var i = 0; i < this.sows.length; i++) {
            this.contractIDList.push(this.sows[i].contractId.toString());
            this.ItOrgList.push(this.sows[i].itorgName);
            this.msOwnerAliasList.push(this.sows[i].msowner);
        }
    };
    SowComponent.prototype.onPageChange = function (number) {
        console.log('change to page', number);
        this.config.currentPage = number;
    };
    SowComponent.prototype.pushItem = function () {
        var item = this.popped.pop() || 'A newly-created meal!';
        this.sows.push(item);
    };
    SowComponent.prototype.popItem = function () {
        this.popped.push(this.sows.pop());
    };
    return SowComponent;
}());
SowComponent = __decorate([
    Component({
        selector: 'sow-grid',
        templateUrl: './sow.component.html',
    }),
    __metadata("design:paramtypes", [SowService, ActivatedRoute])
], SowComponent);
export { SowComponent };
//# sourceMappingURL=sow.component.js.map