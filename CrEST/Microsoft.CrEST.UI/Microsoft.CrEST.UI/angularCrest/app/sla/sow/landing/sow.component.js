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
import { SowService } from "../../shared/services/sows.service";
var SowComponent = (function () {
    function SowComponent(sowService) {
        this.sowService = sowService;
        this.sows = [];
        this.contractid = '';
        this.serviceLine = '';
        this.msOwnerAlias = '';
        this.contractIDList = [];
        this.servicelineList = [];
        this.msOwnerAliasList = [];
        this.searchContractId = '';
        this.searchServiceLine = '';
        this.searchMsowner = '';
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
        this.sowService.getSows()
            .subscribe(function (data) {
            _this.sows = data;
            if (_this.sows) {
                _this.autoComplete();
            }
        });
    };
    SowComponent.prototype.find = function () {
        var _this = this;
        this.sowService.(this.contactId, this.serviceLine, this.application)
            .subscribe(function (data) {
            _this.applicationList = data;
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
            this.contractid = contractID;
        }
    };
    SowComponent.prototype.notifyServiceLine = function (serviceLine) {
        if (event) {
            this.serviceLine = serviceLine;
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
            //this.servicelineList.push(this.sows[i].);
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
    __metadata("design:paramtypes", [SowService])
], SowComponent);
export { SowComponent };
//# sourceMappingURL=sow.component.js.map