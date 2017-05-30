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
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConstantService } from '../../../config/constants.service';
import { CommonService } from '../../../shared/common.service';
var SowService = (function () {
    function SowService(_constantService, commonService, http) {
        this._constantService = _constantService;
        this.commonService = commonService;
        this.http = http;
        this.getSow = _constantService.CONFIG.apiLocations.getSow;
        this.getSowByIdUrl = _constantService.CONFIG.apiLocations.getSowById;
        this.getActiveContract = _constantService.CONFIG.apiLocations.getActiveContract;
        this.getsowMetaDataUrl = _constantService.CONFIG.apiLocations.getSowMetaData;
        this.saveSowUrl = _constantService.CONFIG.apiLocations.saveSow;
        this.findSowUrl = _constantService.CONFIG.apiLocations.findSoWs;
    }
    SowService.prototype.getSows = function () {
        var header = new Headers({ 'Cache-Control': 'no-cache' });
        return this.http.get(this.getSow, { headers: header })
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SowService.prototype.getSowById = function (id) {
        return this.http.get(this.getSowByIdUrl + "/" + id)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SowService.prototype.findSow = function (contractId, ItOrg, msOwener) {
        return this.http.get(this.findSowUrl + '?contractId=' + contractId + "&ITOrg=" + ItOrg + "&msOwner=" + msOwener)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SowService.prototype.getsowMetaData = function () {
        return this.http.get(this.getsowMetaDataUrl)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    //addSow(sow: any) {
    //    return this.http.post(this.saveSowUrl)
    //        .map(res => res.json()).catch(this.commonService.handleError);
    //}
    SowService.prototype.addSow = function (sow) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        var body = JSON.stringify(sow);
        return this.http
            .post(this.saveSowUrl, body, { headers: header })
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SowService.prototype.updateSow = function (sow) {
        return this.http.put(this.getSowUrl(sow.id), JSON.stringify(sow))
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SowService.prototype.deleteSow = function (id) {
        return this.http.delete(this.getSowUrl(id))
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SowService.prototype.getActiveContracts = function () {
        return this.http.get(this.getActiveContract)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    SowService.prototype.getSowUrl = function (id) {
        return this.getSowUrl + "/" + id;
    };
    return SowService;
}());
SowService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, CommonService, Http])
], SowService);
export { SowService };
//# sourceMappingURL=sows.service.js.map