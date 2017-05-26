import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'
import { CommonService } from '../../../shared/common.service'
import { Sow } from "../models/sow";

@Injectable()
export class SowService {

    public getSow: string;
    public saveSowUrl: string;
    public getActiveContract: string;
    public getSowByIdUrl: string;
    public getsowMetaDataUrl: string;
    public findSowUrl: string;

    constructor(private _constantService: ConstantService, private commonService: CommonService, private http: Http) {
        this.getSow = _constantService.CONFIG.apiLocations.getSow;
        this.getSowByIdUrl = _constantService.CONFIG.apiLocations.getSowById;
        this.getActiveContract = _constantService.CONFIG.apiLocations.getActiveContract;
        this.getsowMetaDataUrl = _constantService.CONFIG.apiLocations.getapplicationMetaData;
        this.saveSowUrl = _constantService.CONFIG.apiLocations.saveSow;
        this.findSowUrl = _constantService.CONFIG.apiLocations.findSoWs;
    }

    getSows() {
        return this.http.get(this.getSow)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    getSowById(id: any) {
        return this.http.get(this.getSowByIdUrl+ "/" + id)
            .map(res => res.json()).catch(this.commonService.handleError);
    }


    findSow(contractId: string, serviceline: string, application: string) {
        return this.http.get(this.findSowUrl + contractId + "/" + serviceline + "/" + application)
            .map(res => res.json()).catch(this.commonService.handleError);
    }
    getsowMetaData() {
        return this.http.get(this.getsowMetaDataUrl)
            .map(res => res.json()).catch(this.commonService.handleError);
    }
    //addSow(sow: any) {
    //    return this.http.post(this.saveSowUrl)
    //        .map(res => res.json()).catch(this.commonService.handleError);
    //}


    addSow(sow: Sow): Observable<number> {
        var header = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(sow);
        return this.http
            .post(this.saveSowUrl, body, { headers: header })
            .map(res => res.json()).catch(this.commonService.handleError);
    }


    updateSow(sow: any) {
        return this.http.put(this.getSowUrl(sow.id), JSON.stringify(sow))
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    deleteSow(id: any) {
        return this.http.delete(this.getSowUrl(id))
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    getActiveContracts() {
        return this.http.get(this.getActiveContract)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    private getSowUrl(id: any) {
        return this.getSowUrl + "/" + id;
    }

    
}



