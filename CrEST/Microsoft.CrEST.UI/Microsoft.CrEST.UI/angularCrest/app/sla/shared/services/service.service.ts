import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'
import { CommonService } from '../../../shared/common.service'
import { Service } from "../models/service";

@Injectable()
export class Sservice {

    public getservice: string;
    public getserviceByID: string;
    public findServiceUrl: string;
    public getServiceMetaDataUrl: string;
    public contractorIds: any = [];
    constructor(private _constantService: ConstantService, private commonService: CommonService, private http: Http) {
        this.getservice = _constantService.CONFIG.apiLocations.getservice;
        this.getserviceByID = _constantService.CONFIG.apiLocations.getServiceById;
        this.findServiceUrl = _constantService.CONFIG.apiLocations.findService;
        this.getServiceMetaDataUrl = _constantService.CONFIG.apiLocations.getServiceMetaData;
    }
    getService() {
        //debugger
        return this.http.get(this.getservice)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    getServiceById(id: any) {
        return this.http.get(this.getserviceByID+id)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    getServiceMetaData() {
        return this.http.get(this.getServiceMetaDataUrl)
            .map(res => res.json()).catch(this.commonService.handleError);
    }
    
    addservice(service: Service) {
        return this.http.post(this.getservice, JSON.stringify(service))
            .map(res => res.json()).catch(this.commonService.handleError);
    }


    findService(contractId: string, applicationGroup: string) {
        var applicationGroups = encodeURIComponent(applicationGroup);
        return this.http.get(this.findServiceUrl + '?contractId=' + contractId + "&applicationGroup=" + applicationGroups)
            .map(res => res.json()).catch(this.commonService.handleError);
    }
    
}


