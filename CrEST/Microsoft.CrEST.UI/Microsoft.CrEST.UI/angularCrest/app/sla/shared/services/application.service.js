var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../models/applicationdata.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConstantService } from '../../../config/constants.service';
var ApplicationService = (function () {
    function ApplicationService(_constantService, http) {
        this._constantService = _constantService;
        this.http = http;
        this.getApplicationUrl = _constantService.CONFIG.apiLocations.getApplication;
        this.addApplicationUrl = _constantService.CONFIG.apiLocations.addApplication;
        this.findApplicationUrl = _constantService.CONFIG.apiLocations.findApplicationUrl;
        this.getApplicationbyUrl = _constantService.CONFIG.apiLocations.getApplicationbyId;
        this.getapplicationMetaDataUrl = _constantService.CONFIG.apiLocations.getapplicationMetaData;
    }
    ApplicationService.prototype.getApplications = function () {
        return this.http.get(this.getApplicationUrl)
            .map(function (res) { return res.json(); });
    };
    ApplicationService.prototype.getApplicationMetaData = function () {
        return this.http.get(this.getapplicationMetaDataUrl)
            .map(function (res) { return res.json(); });
    };
    ApplicationService.prototype.findApplication = function (contractId, serviceline, application) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.findApplicationUrl + contractId + "/'" + serviceline + "'" + "/'" + application + "'", { headers: header })
            .map(function (res) { return res.json(); });
    };
    ApplicationService.prototype.getApplicationyId = function (applicationId) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getApplicationbyUrl + applicationId, { headers: header })
            .map(function (res) { return res.json(); });
    };
    //addSow(applicationData: any) {
    //    return this.http.post(this.addApplication,applicationData)
    //        .map(res => res.json());
    //}
    ApplicationService.prototype.addApplication = function (applicationData) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        var body = JSON.stringify(applicationData);
        return this.http
            .post(this.addApplicationUrl, body, { headers: header })
            .map(function (res) { return res.json(); });
    };
    return ApplicationService;
}());
ApplicationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, Http])
], ApplicationService);
export { ApplicationService };
//# sourceMappingURL=application.service.js.map