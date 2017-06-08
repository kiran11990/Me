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
import { ConstantService } from '../../config/constants.service';
import { CommonService } from '../../shared/common.service';
var UserService = (function () {
    function UserService(_constantService, commonService, http) {
        this._constantService = _constantService;
        this.commonService = commonService;
        this.http = http;
        this.validateUserbyURL = _constantService.CONFIG.apiLocations.ValidateUsers;
        this.registerUserInfobyURL = _constantService.CONFIG.apiLocations.RegisterUser;
    }
    UserService.prototype.validateUser = function (username, password) {
        return this.http.get(this.validateUserbyURL + username + "/" + password)
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    UserService.prototype.registerUser = function (username, password, roleName) {
        return this.http.post(this.registerUserInfobyURL + username + "/" + password + "/" + roleName, JSON.stringify(''))
            .map(function (res) { return res.json(); }).catch(this.commonService.handleError);
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConstantService, CommonService, Http])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map