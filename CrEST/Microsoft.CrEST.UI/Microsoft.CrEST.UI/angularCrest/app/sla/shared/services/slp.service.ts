import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'

@Injectable()
export class SlpService {

    private getCurrentPeriodSlpByUserAlias: string;

    constructor(private _constantService: ConstantService, private http: Http) {
        this.getCurrentPeriodSlpByUserAlias = _constantService.CONFIG.apiLocations.getCurrentPeriodSlpByUserAlias;
    }

    getCurrentPeriodSlp() {
        //TODO dynamically  get current user alias
        var alias = 'v-sutat';

        return this.http.get(this.getCurrentPeriodSlpByUserAlias, alias)
            .map(res => res.json());

    }
}



