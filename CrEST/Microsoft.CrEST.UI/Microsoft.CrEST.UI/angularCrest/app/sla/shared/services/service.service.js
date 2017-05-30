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
var Sservice = (function () {
    function Sservice(_constantService, commonService, http) {
        this._constantService = _constantService;
        this.commonService = commonService;
        this.http = http;
        this.getservice = _constantService.CONFIG.apiLocations.getservice;
        this.getserviceByID = _constantService.CONFIG.apiLocations.getserviceByID;
        this.findServiceUrl = _constantService.CONFIG.apiLocations.findService;
        this.getServiceMetaDataUrl = _constantService.CONFIG.apiLocations.getServiceMetaData;
    }
    Sservice.prototype.getService = function () {
        //debugger
        return this.http.get(this.getservice)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    Sservice.prototype.getServiceById = function (id) {
        return this.http.get(this.getserviceByID + "/" + id)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    Sservice.prototype.getServiceMetaData = function () {
        return this.http.get(this.getServiceMetaDataUrl)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    Sservice.prototype.addSow = function (service) {
        return this.http.post(this.getservice, JSON.stringify(service))
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    Sservice.prototype.findService = function (contractId, applicationGroup) {
        var applicationGroups = encodeURIComponent(applicationGroup);
        return this.http.get(this.findServiceUrl + '?contractId=' + contractId + "&applicationGroup=" + applicationGroups)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    return Sservice;
}());
Sservice = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, CommonService, Http])
], Sservice);
export { Sservice };
//export class AutocompleteComponent {
//    public query = '';
//    public countries = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus",
//        "Belgium", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus",
//        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
//        "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo",
//        "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta",
//        "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland",
//        "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
//        "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"];
//    public filteredList = [];
//    public elementRef;
//    constructor(myElement: ElementRef) {
//        this.elementRef = myElement;
//    }
//}
//# sourceMappingURL=service.service.js.map