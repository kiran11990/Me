import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../config/constants.service'
import { CommonService } from '../../../shared/common.service'

@Injectable()
export class Sservice {

    public getservice: string;

    constructor(private _constantService: ConstantService, private commonService: CommonService, private http: Http) {
        this.getservice = _constantService.CONFIG.apiLocations.getservice;
    }
    getService() {
        //debugger
        return this.http.get(this.getservice)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    getServiceById(id: any) {
        return this.http.get(this.getSowUrl(id))
            .map(res => res.json()).catch(this.commonService.handleError);
    }


    addSow(service: any) {
        return this.http.post(this.getservice, JSON.stringify(service))
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    updateSow(service: any) {
        return this.http.put(this.getSowUrl(service.id), JSON.stringify(service))
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    deleteSow(id: any) {
        return this.http.delete(this.getSowUrl(id))
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    private getSowUrl(id: any) {
        return this.getSowUrl + "/" + id;
    }
}
//export class AutocompleteComponent {
//    public query = '';
//    public countries = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus",
//        "Belgium", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus",
//        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
//        "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo",
//        "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta",
//        "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland",
//        "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
//        "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"];
//    public filteredList = [];
//    public elementRef;

//    constructor(myElement: ElementRef) {
//        this.elementRef = myElement;
//    }
//}


