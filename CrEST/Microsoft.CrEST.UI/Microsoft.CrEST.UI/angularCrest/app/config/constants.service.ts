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

                //slp
                //getCurrentPeriodSlpByUserAlias: this.apiBaseUrl + 'api/getCurrentPeriodSlpByUserAlias'
                getCurrentPeriodSlpByUserAlias: 'http://localhost:52537/configMetadata/slp.json',
                saveSLPs: this.apiBaseUrl + 'api/slp/saveSLP',
                generateSLPforCurrentPeriod: this.apiBaseUrl + 'api/slp/generateSLPforCurrentPeriod',
                getSlps: 'http://localhost:52537/configMetadata/slp.json'
            }
        };
    }
}
