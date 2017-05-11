import { Injectable } from '@angular/core';
import { Slp } from '../models/slp';

@Injectable()
export class SlpBusiness {

    

    constructor() {
       
    }

    GetPrefStatus(slps: Slp[], isPref: boolean, isStatus: boolean) {
        var result = new Array<Slp>();
        for (var i = 0; i < slps.length; i++) {
            var slp = slps[i];

            if (isPref == true) {
                //IF(target > minimum, "H", IF(minimum > target, "L", IF(target = 1, "H", IF(target = 0, "L", "N"))))
                slp.pref = (slp.targetLevel > slp.minimumLevel ? "H" :
                            (slp.minimumLevel > slp.targetLevel ? "L" :
                                (slp.targetLevel = 1 ? "H" :
                                    (slp.targetLevel = 0 ? "L" : "N"))));

            }
            if (isStatus == true)
            {
                //TODO Check validate rule!!
                /*IF(value = "Validate!", "Validate!", IF(value = "NA", "NA", 
                IF(pref = "H", IF(value >= target, 3, IF(value >= minimum, 2, 1)),
                IF(pref = "L", IF(value <= target, 3, IF(value <= minimum, 2, 1)), ""))))*/

                if (slp.value = "NA")
                    {}

            }

            result.push(slp);
        }

        return result;
    }

}



