import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'
import { ReportingPeriod } from "../models/reportingperiod";
import { slaData } from "../models/slp";
import { ExportToExcel } from "../models/exportToExcel";
import { CommonService } from '../../../shared/common.service'

@Injectable()
export class SlpService {

    private saveSLPs: string;
    private generateSLPforCurrentPeriod: string;
    private getSlps: string;
    private getReportingPeriod: string;
    private getRASlps: string;
    private exportToExcel: string;

    constructor(private _constantService: ConstantService, private commonService: CommonService,  private http: Http) {
        this.saveSLPs = _constantService.CONFIG.apiLocations.saveSLPs;
        this.generateSLPforCurrentPeriod = _constantService.CONFIG.apiLocations.generateSLPforCurrentPeriod;
        this.getSlps = _constantService.CONFIG.apiLocations.getSlps;
        this.getReportingPeriod = _constantService.CONFIG.apiLocations.getReportingPeriod;
        this.getRASlps = _constantService.CONFIG.apiLocations.getRASlps;
        this.exportToExcel = _constantService.CONFIG.apiLocations.exportToExcel;
    }

    GetReportingPeriods(): Observable<ReportingPeriod[]> {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getReportingPeriod, { headers: header })
            .map((res:any) => res.json() as ReportingPeriod[]).catch(this.commonService.handleError);
    }

    GetSlps(period: string, useralias: string): Observable<slaData[]> {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getSlps + "/" + period, { headers: header })
            .map((res: any) => res.json() as slaData[]).catch(this.commonService.handleError);

    }

    SaveSLPs(data: slaData[]) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        return this.http.post(this.saveSLPs, data, options)
            .map((res: any)=> res.text()).catch(this.commonService.handleError);
    }

    GenerateSLPforCurrentPeriod(currentFP: string, createdBy: string) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.generateSLPforCurrentPeriod + "/" + currentFP + "/" + createdBy, { headers: header })
            .map((res: any) => res.text()).catch(this.commonService.handleError);
    }

    GetRASlps() {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getRASlps, { headers: header })
            .map((res: any) => res.json() as slaData[]).catch(this.commonService.handleError);
    }

    ExportToExcel(fiscalPeriod: any): Observable<ExportToExcel> {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.exportToExcel + '/' + fiscalPeriod, { headers: header })
            .map((res: any) => res.json() as ExportToExcel).catch(this.commonService.handleError);
    }
}



