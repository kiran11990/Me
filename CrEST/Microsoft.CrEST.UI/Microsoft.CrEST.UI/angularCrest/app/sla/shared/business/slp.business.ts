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
        else if (result.value) {
            var value = this.FormatValue(result.value);
            var targetLevel = this.FormatValue(result.targetLevel);
            var minimumLevel = this.FormatValue(result.minimumLevel);
            if (result.pref == "H")
                result.chk = (value >= targetLevel ? "3" : (value >= minimumLevel ? "2" : "1"));
            else if (result.pref == "L")
                result.chk = (value <= targetLevel ? "3" : (value <= minimumLevel ? "2" : "1"));
        }
        else return null;

        return result.chk;
    }

    private FormatValue(value: string) {
        if (value.charAt(value.length - 1) == "%")
            return parseFloat(value.substr(0, value.length - 1)) / 100;
        return value;
    }
}



