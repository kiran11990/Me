import { Injectable } from '@angular/core';
import { Slp } from '../models/slp';

@Injectable()
export class SlpBusiness {

    constructor() {

    }

    public GetStatus(slpData: Slp) {
        var result = slpData;

        //TODO Check validate rule!! IF(value = "Validate!", "Validate!"

        /*IF(value = "Validate!", "Validate!", IF(value = "NA", "NA", 
        IF(pref = "H", IF(value >= target, 3, IF(value >= minimum, 2, 1)),
        IF(pref = "L", IF(value <= target, 3, IF(value <= minimum, 2, 1)), ""))))*/

        if (result.value == "NA")
            result.chk = "NA"
        else {
            if (result.pref == "H")
                result.chk = (result.value >= result.targetLevel ? "3" : (result.value >= result.minimumLevel ? "2" : "1"));
            else if (result.pref == "L")
                result.chk = (result.value <= result.targetLevel ? "3" : (result.value <= result.minimumLevel ? "2" : "1"));
        }

        return result;
    }
}



