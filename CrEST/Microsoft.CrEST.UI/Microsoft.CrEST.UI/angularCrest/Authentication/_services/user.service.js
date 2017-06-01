var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../app/config/constants.service.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConstantService } from '../../app/config/constants.service';
var UserService = (function () {
    function UserService(_constantService, http) {
        this._constantService = _constantService;
        this.http = http;
        this.validateUserbyURL = _constantService.CONFIG.apiLocations.ValidateUsers;
    }
    UserService.prototype.validateUser = function (username, password) {
        return this.http.get(this.validateUserbyURL + username + "/" + password)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, Http])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map