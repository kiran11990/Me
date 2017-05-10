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
var SlpService = (function () {
    function SlpService(_constantService, http) {
        this._constantService = _constantService;
        this.http = http;
        this.getCurrentPeriodSlpByUserAlias = _constantService.CONFIG.apiLocations.getCurrentPeriodSlpByUserAlias;
        this.saveSLPs = _constantService.CONFIG.apiLocations.saveSLPs;
        this.generateSLPforCurrentPeriod = _constantService.CONFIG.apiLocations.generateSLPforCurrentPeriod;
        this.getSlps = _constantService.CONFIG.apiLocations.getSlps;
    }
    SlpService.prototype.getCurrentPeriodSlp = function () {
        //TODO dynamically  get current user alias
        var alias = 'v-sutat';
        return this.http.get(this.getCurrentPeriodSlpByUserAlias, alias)
            .map(function (res) { return res.json(); });
    };
    SlpService.prototype.GetReportingPeriods = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.getSlps)
                .map(function (res) { return res.json().ReporintPeriods; })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    SlpService.prototype.GetSlpByPeriod = function (fiscalYear) {
        return this.http.get(this.getSlps)
            .map(function (res) { return res.json().ServiceLevelPerformance; });
    };
    SlpService.prototype.SaveSLPs = function (data) {
        return this.http.get(this.saveSLPs, data)
            .map(function (res) { return res.json(); });
    };
    SlpService.prototype.GenerateSLPforCurrentPeriod = function () {
        return this.http.get(this.getSlps)
            .map(function (res) { return res.json().ServiceLevelPerformance; });
    };
    return SlpService;
}());
SlpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, Http])
], SlpService);
export { SlpService };
//# sourceMappingURL=slp.service.js.map