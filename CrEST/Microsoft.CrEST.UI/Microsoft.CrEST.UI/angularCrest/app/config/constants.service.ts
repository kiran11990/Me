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
                getApplication: 'http://localhost:53430/api/Application/GetAllApplications',
                addApplication: 'http://localhost:53430/api/Application/SaveApplication',
                findApplicationUrl: 'http://localhost:53430/api/Application/FindApplication/',
                getApplicationbyId: 'http://localhost:53430/api/Application/GetApplicationById/',
                //getsow: 'http://localhost:52537/configMetadata/sample.json',
                getservice: 'http://localhost:52537/configMetadata/service.json',
                //sow
                //getsow: this.apiBaseUrl + 'api/sow'
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
}
