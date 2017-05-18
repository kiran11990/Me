/// <reference path="../models/applicationdata.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service';
import { ApplicationData } from "../models/applicationdata";

@Injectable()
export class ApplicationService {
    public getApplicationUrl: string;
    public addApplicationUrl: string;
    public findApplicationUrl: string;
    public getApplicationbyUrl: string;
    constructor(private _constantService: ConstantService, private http: Http) {
        this.getApplicationUrl = _constantService.CONFIG.apiLocations.getApplication;
        this.addApplicationUrl = _constantService.CONFIG.apiLocations.addApplication
        this.findApplicationUrl = _constantService.CONFIG.apiLocations.findApplicationUrl;
        this.getApplicationbyUrl = _constantService.CONFIG.apiLocations.getApplicationbyId;
    }

    getApplications() {
        return this.http.get(this.getApplicationUrl)
            .map(res => res.json());
    } 
 
    findApplication(contractId: any, serviceline: any, application: any) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.findApplicationUrl + contractId + "/'" + serviceline + "'" + "/'" + application + "'", { headers: header })
            .map(res => res.json());
    }
    getApplicationyId(applicationId: any) {
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getApplicationbyUrl + applicationId , { headers: header })
            .map(res => res.json());
    }

    //addSow(applicationData: any) {
    //    return this.http.post(this.addApplication,applicationData)
    //        .map(res => res.json());
    //}
   



    addApplication(applicationData: ApplicationData): Observable<boolean> {
        var header = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(applicationData);
        return this.http
            .post(this.addApplicationUrl, body, { headers: header })
            .map(res => res.json());
    }
    //updateSow(sow: any) {
    //    return this.http.put(this.getSowUrl(sow.id), JSON.stringify(sow))
    //        .map(res => res.json());
    //}

    //deleteSow(id: any) {
    //    return this.http.delete(this.getSowUrl(id))
    //        .map(res => res.json());
    //}

    //private getSowUrl(id: any) {
    //    return this.getSowUrl + "/" + id;
    //}
}



