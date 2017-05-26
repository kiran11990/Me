/// <reference path="../models/applicationdata.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service';
import { ApplicationData } from "../models/applicationdata";
import { CommonService } from '../../../shared/common.service'

@Injectable()
export class ApplicationService {
    public getApplicationUrl: string;
    public addApplicationUrl: string;
    public findApplicationUrl: string;
    public getApplicationbyUrl: string;
    public getapplicationMetaDataUrl: string;
    constructor(private _constantService: ConstantService, private commonService: CommonService, private http: Http) {
        this.getApplicationUrl = _constantService.CONFIG.apiLocations.getApplication;
        this.addApplicationUrl = _constantService.CONFIG.apiLocations.addApplication
        this.findApplicationUrl = _constantService.CONFIG.apiLocations.findApplicationUrl;
        this.getApplicationbyUrl = _constantService.CONFIG.apiLocations.getApplicationbyId;
        this.getapplicationMetaDataUrl = _constantService.CONFIG.apiLocations.getapplicationMetaData;
    }

    getApplications() {
        return this.http.get(this.getApplicationUrl)
            .map(res => res.json()).catch(this.commonService.handleError);
    } 


    getApplicationMetaData() {
        return this.http.get(this.getapplicationMetaDataUrl)
            .map(res => res.json()).catch(this.commonService.handleError);
    }
    findApplication(contractId: string, serviceline: string, application: string) {
      
        return this.http.get(this.findApplicationUrl + '?contractId=' + contractId + "&serviceLine=" + serviceline + "&application=" + application )
            .map(res => res.json()).catch(this.commonService.handleError);
    }
    getApplicationbyId(applicationId: any) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getApplicationbyUrl + applicationId , { headers: header })
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    addApplication(applicationData: ApplicationData): Observable<number> {
        var header = new Headers({ 'Content-Type': 'application/json'});
        let body = JSON.stringify(applicationData);
        return this.http
            .post(this.addApplicationUrl, body, { headers: header })
            .map(res => res.json()).catch(this.commonService.handleError);
    }
}



