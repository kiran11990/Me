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
import { ConfigService } from '../config/config.service';
var ConstantService = (function () {
    function ConstantService(_config) {
        this._config = _config;
        this.apiBaseUrl = _config.get("apiBaseUri");
        this.apiBaseUrlWithAPI = this.apiBaseUrl + "api/";
        this.CONFIG = {
            apiLocations: {
                baseUrl: this.apiBaseUrl,
                //application
                getApplication: this.apiBaseUrlWithAPI + 'Application/GetAllApplications',
                addApplication: this.apiBaseUrlWithAPI + 'Application/SaveApplication',
                findApplicationUrl: this.apiBaseUrlWithAPI + 'Application/FindApplication/',
                getApplicationbyId: this.apiBaseUrlWithAPI + 'Application/GetApplicationById/',
                //service
                getservice: 'http://localhost:52537/configMetadata/service.json',
                //sow
                getsow: this.apiBaseUrlWithAPI + 'sow/GetAllSoWs',
                getActiveContract: this.apiBaseUrlWithAPI + 'sow/GetActiveContracts',
                //slp
                saveSLPs: this.apiBaseUrl + 'api/slp/saveSLP',
                generateSLPforCurrentPeriod: this.apiBaseUrl + 'slp/generateSLPforCurrentPeriod',
                getSlps: this.apiBaseUrlWithAPI + 'slp/GetSLPs',
                getReportingPeriod: this.apiBaseUrl + 'slp/GetReportingPeriod'
            }
        };
    }
    return ConstantService;
}());
ConstantService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], ConstantService);
export { ConstantService };
//# sourceMappingURL=constants.service.js.map