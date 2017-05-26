import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
    private getSlpByStatus: string;

    constructor(private _constantService: ConstantService, private commonService: CommonService,  private http: Http) {
        this.saveSLPs = _constantService.CONFIG.apiLocations.saveSLPs;
        this.generateSLPforCurrentPeriod = _constantService.CONFIG.apiLocations.generateSLPforCurrentPeriod;
        this.getSlps = _constantService.CONFIG.apiLocations.getSlps;
        this.getReportingPeriod = _constantService.CONFIG.apiLocations.getReportingPeriod;
        this.getSlpByStatus = _constantService.CONFIG.apiLocations.getSlpByStatus;
    }

    GetReportingPeriods() {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getReportingPeriod, { headers: header })
            .map(res => res.json() as ReportingPeriod[]).catch(this.commonService.handleError);
    }

    GetSlps(period: string, useralias: string) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getSlps + "/" + period, { headers: header })
            .map(res => res.json() as Slp[]).catch(this.commonService.handleError);
    }

    SaveSLPs(data: Slp[]) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        return this.http.post(this.saveSLPs, data, options)
            .map(res => res.text()).catch(this.commonService.handleError);
    }

    GenerateSLPforCurrentPeriod(currentFP: string, createdBy: string) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.generateSLPforCurrentPeriod + "/" + currentFP + "/" + createdBy, { headers: header })
            .map(res => res.text()).catch(this.commonService.handleError);
    }

    GetSlpsByStatus(status: number, useralias: string) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getSlpByStatus + '/' + status, { headers: header })
            .map(res => res.json() as Slp[]).catch(this.commonService.handleError);
    }
}



