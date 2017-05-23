var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApplicationService } from "./../shared/services/application.service";
var SlaApplicationComponent = (function () {
    function SlaApplicationComponent(http, _router, applicationService, _routeParameterd) {
        this.http = http;
        this.applicationService = applicationService;
        this._routeParameterd = _routeParameterd;
        this.contactId = '';
        this.serviceLine = '';
        this.application = '';
        this.SaveSucessfull = false;
        this.states = [];
        this.contactdetails = [];
        this.contactIdList = [];
        this.servicelineList = [];
        this.ApplicationLists = [];
        this.applicationList = [];
        this.filteredList = [];
        this.ContactIdList = [];
        this.searchContactId = '';
        this.searchServiceLine = '';
        this.searchApplication = '';
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
        this.router = _router;
    }
    SlaApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._routeParameterd.snapshot.params['saveApplicationStatus']) {
            this.SaveSucessfull = true;
        }
        this.applicationList = [];
        this.applicationService.getApplications()
            .subscribe(function (data) {
            _this.applicationList = data;
            if (_this.applicationList) {
                _this.autoComplete();
            }
        });
    };
    SlaApplicationComponent.prototype.find = function () {
        var _this = this;
        this.applicationService.findApplication(this.contactId, this.serviceLine, this.application)
            .subscribe(function (data) {
            _this.applicationList = data;
        });
    };
    SlaApplicationComponent.prototype.notifyContactId = function (ContactId) {
        if (event) {
            this.contactId = ContactId;
        }
    };
    SlaApplicationComponent.prototype.notifyServiceLine = function (serviceLine) {
        if (event) {
            this.serviceLine = serviceLine;
        }
    };
    SlaApplicationComponent.prototype.notifyApplication = function (Application) {
        if (event) {
            this.application = Application;
        }
    };
    SlaApplicationComponent.prototype.autoComplete = function () {
        for (var i = 0; i < this.applicationList.length; i++) {
            this.ApplicationLists.push(this.applicationList[i].application);
            this.contactIdList.push(this.applicationList[i].contractId.toString());
            this.servicelineList.push(this.applicationList[i].serviceLine);
        }
    };
    SlaApplicationComponent.prototype.onPageChange = function (number) {
        console.log('change to page', number);
        this.config.currentPage = number;
    };
    SlaApplicationComponent.prototype.pushItem = function () {
        var item = this.popped.pop() || 'A newly-created meal!';
        this.applicationList.push(item);
    };
    SlaApplicationComponent.prototype.popItem = function () {
        this.popped.push(this.applicationList.pop());
    };
    return SlaApplicationComponent;
}());
SlaApplicationComponent = __decorate([
    Component({
        selector: 'sla-application',
        template: require('./application.component.html'),
        changeDetection: ChangeDetectionStrategy.Default
    }),
    __metadata("design:paramtypes", [Http, Router, ApplicationService, ActivatedRoute])
], SlaApplicationComponent);
export { SlaApplicationComponent };
//# sourceMappingURL=application.component.js.map