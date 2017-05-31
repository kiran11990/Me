var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var SlpBusiness = (function () {
    function SlpBusiness() {
    }
    SlpBusiness.prototype.GetStatus = function (slpData) {
        var result = slpData;
        //TODO Check validate rule!! IF(value = "Validate!", "Validate!"
        /*IF(value = "Validate!", "Validate!", IF(value = "NA", "NA",
        IF(pref = "H", IF(value >= target, 3, IF(value >= minimum, 2, 1)),
        IF(pref = "L", IF(value <= target, 3, IF(value <= minimum, 2, 1)), ""))))*/
        if (result.value == "NA")
            result.chk = "";
        else if (result.value) {
            var value = this.FormatValue(result.value);
            var targetLevel = this.FormatValue(result.targetLevel);
            var minimumLevel = this.FormatValue(result.minimumLevel);
            if (result.pref == "H")
                result.chk = (value >= targetLevel ? "3" : (value >= minimumLevel ? "2" : "1"));
            else if (result.pref == "L")
                result.chk = (value <= targetLevel ? "3" : (value <= minimumLevel ? "2" : "1"));
        }
        else
            return null;
        return result.chk;
    };
    SlpBusiness.prototype.FormatValue = function (value) {
        if (value.charAt(value.length - 1) == "%")
            return parseFloat(value.substr(0, value.length - 1)) / 100;
        return value;
    };
    return SlpBusiness;
}());
SlpBusiness = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], SlpBusiness);
export { SlpBusiness };
//# sourceMappingURL=slp.business.js.map