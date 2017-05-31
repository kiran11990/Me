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
                getapplicationMetaData: this.apiBaseUrlWithAPI + 'Application/GetApplicationMetadata',
                //service
                getservice: this.apiBaseUrlWithAPI + 'Service/GetAllServices',
                getServiceById: this.apiBaseUrlWithAPI + 'Service/GetServiceById/',
                saveService: this.apiBaseUrlWithAPI + 'Service/SaveService',
                findService: this.apiBaseUrlWithAPI + 'Service/FindServices/',
                getServiceMetaData: this.apiBaseUrlWithAPI + 'Service/GetServiceMetadataList',
                //sow
                getSow: this.apiBaseUrlWithAPI + 'SoW/GetAllSoWs',
                getSowById: this.apiBaseUrlWithAPI + 'SoW/GetSoWById/',
                findSoWs: this.apiBaseUrlWithAPI + 'SoW/FindSoWs/',
                saveSow: this.apiBaseUrlWithAPI + 'SoW/SaveSoW',
                getSowMetaData: this.apiBaseUrlWithAPI + 'sow/GetSowMetadata',
                getActiveContract: this.apiBaseUrlWithAPI + 'sow/GetActiveContracts',
                //slp
                saveSLPs: this.apiBaseUrlWithAPI + 'slp/SaveSlps',
                generateSLPforCurrentPeriod: this.apiBaseUrlWithAPI + 'slp/GenerateSlps',
                getSlps: this.apiBaseUrlWithAPI + 'slp/GetSLPs',
                getReportingPeriod: this.apiBaseUrlWithAPI + 'slp/GetReportingPeriod',
                getRASlps: this.apiBaseUrlWithAPI + 'slp/GetRASlps'
            }
        };
        this.CONSTANTS = {
            Messages: {
                INF0001: 'Saved successfully.',
                INF0002: 'SLAs for the current period has been generated successfully.',
                ERR0001: 'Unable to save data. Please try later.',
                ERR0002: 'Please correct the data and save again',
                ERR0003: 'Unable to generate SLAs due to some issue. Please try later.',
                ERR0004: 'Unable to generate SLAs as there are SLAs already present for current period!!'
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