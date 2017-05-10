var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SlpService } from "../shared/services/slp.service";
//import { PaginationComponent, FilterEvent } from './pagination.component';
//import { PaginationSorter } from './PaginationSorter'; 
/*import { PaginationComponent, FilterEvent } from '../../shared/pagination/pagination.component';
import { PaginationSorter } from '../../shared/pagination/PaginationSorter';

@NgModule({
    declarations: [PaginationComponent, PaginationSorter]

})*/
var SlpComponent = (function () {
    function SlpComponent(_slpService) {
        this._slpService = _slpService;
        this.data = [];
        this.colHeaders = [];
        this.columns = [];
        this.colWidths = [];
        this.periods = new Array();
        this.periods = new Array();
    }
    SlpComponent.prototype.ngOnInit = function () {
        this.GetReportingPeriods();
        this.SetHeaders();
    };
    SlpComponent.prototype.GetReportingPeriods = function () {
        var _this = this;
        this._slpService.GetReportingPeriods().then(function (result) {
            _this.periods = result;
            _this.selectedPeriod = _this.periods[0];
            _this.GetSLPData(_this.selectedPeriod.fiscalYear);
        });
    };
    //**Actions and Events Start
    SlpComponent.prototype.GetSLPData = function (fiscalYear) {
        var _this = this;
        this._slpService.GetSlpByPeriod(fiscalYear).subscribe(function (result) {
            //TODO : can we cleanup this?
            if (fiscalYear != "All") {
                _this.data = result.filter(function (res) {
                    return res.reportingPeriod == fiscalYear;
                });
            }
            else {
                _this.data = result;
            }
        });
    };
    SlpComponent.prototype.onChange = function (newObj) {
        this.Message = "";
        this.currentSelectedPeriod = newObj;
        this.GetSLPData(newObj);
    };
    SlpComponent.prototype.Generate = function (fiscalYear) {
        this.Message = "";
        var _this = this;
        var currentFP = this.getCurrentFiscalY() + "-" + this.getCurrentFiscalP();
        var nextFP = this.getCurrentFiscalY() + "-" + (this.getCurrentFiscalP() + 1);
        if (currentFP == fiscalYear) {
            this._slpService.GenerateSLPforCurrentPeriod()
                .subscribe(function (result) {
                _this.data = result.filter(function (res) {
                    return res.reportingPeriod == fiscalYear;
                });
                //TODO : can we cleanup this?
                for (var i = 0; i < _this.data.length; i++) {
                    _this.data[i].reportingPeriod = nextFP;
                    _this.data[i].value = "";
                    _this.data[i].valueRemarks = "";
                }
            });
        }
        else {
            this.Message = "Please select current fiscal period to generate.";
            this.MessageType = 2; //MessageType 1 : alert success & MessageType 2 is for danger
        }
    };
    SlpComponent.prototype.AutoFill = function (fiscalYear) {
        this.Message = "";
        var _this = this;
        var currentFP = this.getCurrentFiscalY() + "-" + this.getCurrentFiscalP();
        var nextFP = this.getCurrentFiscalY() + "-" + (this.getCurrentFiscalP() + 1);
        if (currentFP == fiscalYear) {
            this._slpService.GenerateSLPforCurrentPeriod()
                .subscribe(function (result) {
                _this.data = result.filter(function (res) {
                    return res.reportingPeriod == fiscalYear;
                });
                //TODO : can we cleanup this?
                for (var i = 0; i < _this.data.length; i++) {
                    _this.data[i].reportingPeriod = nextFP;
                }
            });
        }
        else {
            this.Message = "Please select current fiscal period to generate.";
            this.MessageType = 2; //MessageType 1 : alert success & MessageType 2 is for danger
        }
    };
    SlpComponent.prototype.Save = function () {
        this.Message = "Saved Successfully";
        this.MessageType = 1; //MessageType 1 : alert success & MessageType 2 is for danger
        //this._slpService.SaveSLPs(this.data)
        //    .subscribe(data => {
        //        this.data = data;
        //    });
    };
    //**Actions and Events End
    SlpComponent.prototype.getCurrentFiscalP = function () {
        var d = new Date();
        var currentMonth = d.getMonth() + 1;
        var fiscalMonth = currentMonth + 6;
        if (fiscalMonth > 12) {
            fiscalMonth = fiscalMonth - 12;
        }
        return fiscalMonth;
    };
    SlpComponent.prototype.getCurrentFiscalY = function () {
        var d = new Date();
        var fiscalYear;
        if (d.getMonth() > 8) {
            fiscalYear = d.getFullYear() + 1;
        }
        else {
            fiscalYear = d.getFullYear();
        }
        return fiscalYear;
    };
    SlpComponent.prototype.GetData = function () {
        var _this = this;
        this._slpService.getCurrentPeriodSlp()
            .subscribe(function (data) {
            _this.data = data;
        });
    };
    SlpComponent.prototype.SetHeaders = function () {
        this.colHeaders.push('supplier');
        this.colWidths.push(50);
        this.columns.push({
            data: "supplier",
            readOnly: true
        });
        this.colHeaders.push('scid');
        this.colWidths.push(50);
        this.columns.push({
            data: "scid",
            readOnly: true
        });
        this.colHeaders.push('Contract ID');
        this.colWidths.push(50);
        this.columns.push({
            data: "contractID",
            readOnly: true
        });
        this.colHeaders.push('Application Group');
        this.colWidths.push(50);
        this.columns.push({
            data: "applicationGroup",
            readOnly: true
        });
        this.colHeaders.push('Crest Level 1 Service');
        this.colWidths.push(50);
        this.columns.push({
            data: "crestL1Service",
            readOnly: true
        });
        this.colHeaders.push('Crest Level 2 Service');
        this.colWidths.push(50);
        this.columns.push({
            data: "crestL2Service",
            readOnly: true
        });
        this.colHeaders.push('SLA ID');
        this.colWidths.push(50);
        this.columns.push({
            data: "slaid",
            readOnly: true
        });
        this.colHeaders.push('Service Metric');
        this.colWidths.push(50);
        this.columns.push({
            data: "serviceMetric",
            readOnly: true
        });
        this.colHeaders.push('Service Class');
        this.colWidths.push(50);
        this.columns.push({
            data: "serviceClass",
            readOnly: true
        });
        this.colHeaders.push('Severity Level');
        this.colWidths.push(50);
        this.columns.push({
            data: "severityLevel",
            readOnly: true
        });
        this.colHeaders.push('Priority Level');
        this.colWidths.push(50);
        this.columns.push({
            data: "priorityLevel",
            readOnly: true
        });
        this.colHeaders.push('Environment');
        this.colWidths.push(50);
        this.columns.push({
            data: "environment",
            readOnly: true
        });
        this.colHeaders.push('Custom');
        this.colWidths.push(50);
        this.columns.push({
            data: "custom",
            readOnly: true
        });
        this.colHeaders.push('Minimum Level');
        this.colWidths.push(50);
        this.columns.push({
            data: "minimumLevel",
            readOnly: true
        });
        this.colHeaders.push('Target Level');
        this.colWidths.push(50);
        this.columns.push({
            data: "targetLevel",
            readOnly: true
        });
        this.colHeaders.push('Weight');
        this.colWidths.push(50);
        this.columns.push({
            data: "weight",
            readOnly: true
        });
        this.colHeaders.push('Remarks');
        this.colWidths.push(100);
        this.columns.push({
            data: "remarks",
            readOnly: true
        });
        this.colHeaders.push('Validation Notes');
        this.colWidths.push(100);
        this.columns.push({
            data: "validationNotes",
            readOnly: true
        });
        this.colHeaders.push('Period');
        this.colWidths.push(50);
        this.columns.push({
            data: "reportingPeriod",
            readOnly: true
        });
        this.colHeaders.push('Pref');
        this.colWidths.push(50);
        this.columns.push({
            data: "pref",
            readOnly: true
        });
        this.colHeaders.push('Type');
        this.colWidths.push(50);
        this.columns.push({
            data: "type",
            readOnly: true
        });
        this.colHeaders.push('Value');
        this.colWidths.push(50);
        this.columns.push({
            data: "value",
        });
        this.colHeaders.push('Value Remarks');
        this.colWidths.push(100);
        this.columns.push({
            data: "valueRemarks"
        });
        this.colHeaders.push('CHK');
        this.colWidths.push(50);
        this.columns.push({
            data: "chk",
            readOnly: true
        });
        this.options = {
            height: 396,
            stretchH: 'all',
            columnSorting: true,
            className: 'htCenter htMiddle',
            colHeaders: this.colHeaders
        };
    };
    return SlpComponent;
}());
SlpComponent = __decorate([
    Component({
        selector: 'sla-slp',
        templateUrl: './slp.component.html',
    }),
    __metadata("design:paramtypes", [SlpService])
], SlpComponent);
export { SlpComponent };
//# sourceMappingURL=slp.component.js.map