import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ConstantService {
    private apiBaseUrl: string
    private apiBaseUrlWithAPI: string
    public CONFIG: any;
    public CONSTANTS: any;

    constructor(private _config: ConfigService) {
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
                getRASlps: this.apiBaseUrlWithAPI + 'slp/GetRASlps',
                exportToExcel: this.apiBaseUrlWithAPI + 'slp/ExportToExcel'
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
}
