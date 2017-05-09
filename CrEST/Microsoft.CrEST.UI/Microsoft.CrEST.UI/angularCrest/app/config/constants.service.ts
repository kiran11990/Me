import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ConstantService {
    private apiBaseUrl: string
    private apiBaseUrlWithVersion: string
    public CONFIG: any;
    constructor(private _config: ConfigService) {
        this.apiBaseUrl = _config.get("apiBaseUri");
        this.apiBaseUrlWithVersion = this.apiBaseUrl + "/api/v1.0";
        this.CONFIG = {
            apiLocations: {
                baseUrl: this.apiBaseUrl,

                //sow
                //getsow: this.apiBaseUrl + 'api/sow'
                getsow: 'http://localhost:52537/configMetadata/sow.json',

                //slp
                //getCurrentPeriodSlpByUserAlias: this.apiBaseUrl + 'api/getCurrentPeriodSlpByUserAlias'
                getCurrentPeriodSlpByUserAlias: 'http://localhost:52537/configMetadata/slp.json',
                saveSLPs: this.apiBaseUrl + 'api/slp/saveSLP',
                generateSLPforCurrentPeriod: this.apiBaseUrl + 'api/slp/generateSLPforCurrentPeriod'
            }
        };
    }
}
