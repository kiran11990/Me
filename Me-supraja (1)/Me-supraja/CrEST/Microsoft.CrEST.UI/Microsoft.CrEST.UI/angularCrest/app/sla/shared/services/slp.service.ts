import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'
import { ReportingPeriod } from "../models/reportingperiod";
import { Slp } from "../models/slp";
import { CommonService } from '../../../shared/common.service'

@Injectable()
export class SlpService {

    private saveSLPs: string;
    private generateSLPforCurrentPeriod: string;
    private getSlps: string;
    private getReportingPeriod: string;

    constructor(private _constantService: ConstantService, private commonService: CommonService,  private http: Http) {
        this.saveSLPs = _constantService.CONFIG.apiLocations.saveSLPs;
        this.generateSLPforCurrentPeriod = _constantService.CONFIG.apiLocations.generateSLPforCurrentPeriod;
        this.getSlps = _constantService.CONFIG.apiLocations.getSlps;
        this.getReportingPeriod = _constantService.CONFIG.apiLocations.getReportingPeriod;
    }

    GetReportingPeriods() {
        return this.http.get(this.getReportingPeriod)
            .map(res => res.json() as ReportingPeriod[]).catch(this.commonService.handleError);
    }

    GetSlps(period: string, useralias: string) {
        return this.http.get(this.getSlps + '/' + period + '/' + useralias)
            .map(res => res.json() as Slp[]).catch(this.commonService.handleError);
    }

    SaveSLPs(data: Array<any>) {
        return this.http.post(this.saveSLPs, data)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    GenerateSLPforCurrentPeriod(previousFP: string) {
        return this.http.get(this.getSlps + '/' + previousFP)
            .map(res => res.json().ServiceLevelPerformance as Slp[]).catch(this.commonService.handleError);
    }
}



