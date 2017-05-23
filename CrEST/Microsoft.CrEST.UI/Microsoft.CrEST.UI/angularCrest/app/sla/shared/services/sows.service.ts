import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'
import { CommonService } from '../../../shared/common.service'

@Injectable()
export class SowService {

    public getSow: string;
    public getActiveContract: string;

    constructor(private _constantService: ConstantService, private commonService: CommonService, private http: Http) {
        this.getSow = _constantService.CONFIG.apiLocations.getsow;
        this.getActiveContract = _constantService.CONFIG.apiLocations.getActiveContract;
    }

    getSows() {
        return this.http.get(this.getSow)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    getSowById(id: any) {
        return this.http.get(this.getSowUrl(id))
            .map(res => res.json()).catch(this.commonService.handleError);
    }


    addSow(sow: any) {
        return this.http.post(this.getSow, JSON.stringify(sow))
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



