var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConstantService } from '../../../config/constants.service';
import { CommonService } from '../../../shared/common.service';
var SlpService = (function () {
    function SlpService(_constantService, commonService, http) {
        this._constantService = _constantService;
        this.commonService = commonService;
        this.http = http;
        this.saveSLPs = _constantService.CONFIG.apiLocations.saveSLPs;
        this.generateSLPforCurrentPeriod = _constantService.CONFIG.apiLocations.generateSLPforCurrentPeriod;
        this.getSlps = _constantService.CONFIG.apiLocations.getSlps;
        this.getReportingPeriod = _constantService.CONFIG.apiLocations.getReportingPeriod;
    }
    SlpService.prototype.GetReportingPeriods = function () {
        return this.http.get(this.getReportingPeriod)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SlpService.prototype.GetSlps = function (period, useralias) {
        return this.http.get(this.getSlps + '/' + period + '/' + useralias)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SlpService.prototype.SaveSLPs = function (data) {
        return this.http.post(this.saveSLPs, data)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SlpService.prototype.GenerateSLPforCurrentPeriod = function (previousFP) {
        return this.http.get(this.getSlps + '/' + previousFP)
            .map(function (res) { return res.json().ServiceLevelPerformance; }).catch(this.commonService.handleError);
    };
    return SlpService;
}());
SlpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, CommonService, Http])
], SlpService);
export { SlpService };
//# sourceMappingURL=slp.service.js.map