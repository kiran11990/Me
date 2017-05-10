import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'
import { ReportingPeriod } from "../models/reportingperiod";
import { Slp } from "../models/slp";

@Injectable()
export class SlpService {

    private getCurrentPeriodSlpByUserAlias: string;
    private saveSLPs: string;
    private generateSLPforCurrentPeriod: string;
    private getSlps: string;

    constructor(private _constantService: ConstantService, private http: Http) {
        this.getCurrentPeriodSlpByUserAlias = _constantService.CONFIG.apiLocations.getCurrentPeriodSlpByUserAlias;
        this.saveSLPs = _constantService.CONFIG.apiLocations.saveSLPs;
        this.generateSLPforCurrentPeriod = _constantService.CONFIG.apiLocations.generateSLPforCurrentPeriod;
        this.getSlps = _constantService.CONFIG.apiLocations.getSlps;
    }

    getCurrentPeriodSlp() {
        //TODO dynamically  get current user alias
        var alias = 'v-sutat';

        return this.http.get(this.getCurrentPeriodSlpByUserAlias, alias)
            .map(res => res.json());
    }

    GetReportingPeriods() {
        return new Promise((resolve, reject) => {
            this.http.get(this.getSlps)
                .map(res => res.json().ReporintPeriods as ReportingPeriod[])
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }

    GetSlpByPeriod(fiscalYear: string) {
        return this.http.get(this.getSlps)
            .map(res => res.json().ServiceLevelPerformance as Slp[]);
    }

    SaveSLPs(data: Array<any>) {
        return this.http.get(this.saveSLPs, data)
            .map(res => res.json());
    }

    GenerateSLPforCurrentPeriod() {
        return this.http.get(this.generateSLPforCurrentPeriod)
            .map(res => res.json());
    }
}



