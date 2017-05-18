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
var Sservice = (function () {
    function Sservice(_constantService, http) {
        this._constantService = _constantService;
        this.http = http;
        this.getservice = _constantService.CONFIG.apiLocations.getservice;
    }
    Sservice.prototype.getService = function () {
        //debugger
        return this.http.get(this.getservice)
            .map(function (res) { return res.json(); });
    };
    Sservice.prototype.getServiceById = function (id) {
        return this.http.get(this.getSowUrl(id))
            .map(function (res) { return res.json(); });
    };
    Sservice.prototype.addSow = function (service) {
        return this.http.post(this.getservice, JSON.stringify(service))
            .map(function (res) { return res.json(); });
    };
    Sservice.prototype.updateSow = function (service) {
        return this.http.put(this.getSowUrl(service.id), JSON.stringify(service))
            .map(function (res) { return res.json(); });
    };
    Sservice.prototype.deleteSow = function (id) {
        return this.http.delete(this.getSowUrl(id))
            .map(function (res) { return res.json(); });
    };
    Sservice.prototype.getSowUrl = function (id) {
        return this.getSowUrl + "/" + id;
    };
    return Sservice;
}());
Sservice = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, Http])
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