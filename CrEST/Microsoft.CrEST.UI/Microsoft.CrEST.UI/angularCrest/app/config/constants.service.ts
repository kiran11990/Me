import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ConstantService {
    private apiBaseUrl: string
    private apiBaseUrlWithAPI: string
    public CONFIG: any;
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
                getservice: 'http://localhost:52537/configMetadata/service.json',

                
                //sow
                getSow: this.apiBaseUrlWithAPI + 'SoW/GetAllSoWs',
                getSowById: this.apiBaseUrlWithAPI + 'SoW/GetSoWById/',
                findSoWs: this.apiBaseUrlWithAPI + 'SoW/FindSoWs/',
                saveSow: this.apiBaseUrlWithAPI + 'SoW/SaveSoW',
                getActiveContract: this.apiBaseUrlWithAPI + 'sow/GetActiveContracts',

                //slp
                saveSLPs: this.apiBaseUrlWithAPI + 'api/slp/saveSLP',
                generateSLPforCurrentPeriod: this.apiBaseUrlWithAPI + 'slp/generateSLPforCurrentPeriod',
                getSlps: this.apiBaseUrlWithAPI + 'slp/GetSLPs',
                getReportingPeriod: this.apiBaseUrlWithAPI + 'slp/GetReportingPeriod',
                getSlpByStatus: this.apiBaseUrlWithAPI + 'slp/GetSlpsByStatus'
            }
        };
    }
}
