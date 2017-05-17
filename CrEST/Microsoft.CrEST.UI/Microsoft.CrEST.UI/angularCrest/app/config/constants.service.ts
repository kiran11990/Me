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
