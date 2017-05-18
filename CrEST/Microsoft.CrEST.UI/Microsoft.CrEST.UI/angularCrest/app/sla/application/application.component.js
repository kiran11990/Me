var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApplicationService } from "./../shared/services/application.service";
var SlaApplicationComponent = (function () {
    function SlaApplicationComponent(http, _router, applicationService) {
        this.http = http;
        this.applicationService = applicationService;
        this.contactId = '';
        this.serviceLine = '';
        this.application = '';
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
        this.meals = [];
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
        //this.searchContactId = this.contactId.trim();
        //this.searchServiceLine = this.serviceLine.trim();
        //this.searchApplication = this.application.trim();
        this.applicationService.findApplication(this.contactId, this.serviceLine, this.application)
            .subscribe(function (data) {
            _this.applicationList = data;
        });
    };
    //edit(id: any) {
    //    alert(id + "the value should be")
    //    this.id = id;
    //    this.router.navigate(['/applications', this.id]);
    //}
    //notifyContactId(ContactId: string) {
    //    if (event) {
    //        this.contactId = ContactId;
    //    }
    //}
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
            //alert(this.applicationList[i].application +"this.applicationList[i].application")
            this.ApplicationLists.push(this.applicationList[i].application1);
            //this.contactIdList.push(this.applicationList[i].contactId);
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
__decorate([
    Input('data'),
    __metadata("design:type", Array)
], SlaApplicationComponent.prototype, "meals", void 0);
SlaApplicationComponent = __decorate([
    Component({
        selector: 'sla-application',
        template: require('./application.component.html'),
        changeDetection: ChangeDetectionStrategy.Default
    }),
    __metadata("design:paramtypes", [Http, Router, ApplicationService])
], SlaApplicationComponent);
export { SlaApplicationComponent };
//# sourceMappingURL=application.component.js.map