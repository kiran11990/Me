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
import { SlpBusiness } from "../shared/business/slp.business";
import { ReportingPeriod } from "../shared/models/reportingperiod";
var SlpComponent = (function () {
    function SlpComponent(_slpService, _slpBusiness) {
        this._slpService = _slpService;
        this._slpBusiness = _slpBusiness;
        this.data = [];
        this.colHeaders = [];
        this.columns = [];
        this.colWidths = [];
        this.valueRegexValidator = /^(\d\d?(\.\d\d?)?%|100(\.00?)?%|NA|na|\d)$/;
        this.remarksRegexValidtor = /^[ A-Za-z0-9_@./#&+-]*$/;
        this.isValidHandsonData = true;
        this.showGenerateAction = false;
        this.showSaveAction = false;
        this.periods = new Array();
    }
    SlpComponent.prototype.ngOnInit = function () {
        this.GetReportingPeriods();
        this.SetHeaders();
    };
    //**Actions and Events Start
    SlpComponent.prototype.onChange = function (selectedPeriod, _this) {
        _this.selectedPeriod = selectedPeriod;
        var currentFP = _this.getCurrentY() + "-" + ('0' + _this.getCurrentP()).slice(-2);
        var previousFP = _this.GetPreviousFP();
        _this.currentSelectedPeriod = selectedPeriod.period;
        if (_this.currentSelectedPeriod == currentFP) {
            _this.showGenerateAction = true;
            _this.showSaveAction = true;
        }
        else if (_this.currentSelectedPeriod == previousFP) {
            _this.showGenerateAction = false;
            _this.showSaveAction = true;
        }
        else {
            _this.showGenerateAction = false;
            _this.showSaveAction = false;
        }
        this.GetSLPData(selectedPeriod.period);
    };
    SlpComponent.prototype.Generate = function (fiscalYear) {
        this.Message = "";
        var _this = this;
        var currentFP = this.getCurrentY() + "-" + this.getCurrentP();
        var previousFP = this.GetPreviousFP();
        if (currentFP == fiscalYear) {
            this._slpService.GenerateSLPforCurrentPeriod(currentFP)
                .subscribe(function (result) {
                _this.data = result.filter(function (res) {
                    return res.reportingPeriod == previousFP;
                });
                //TODO : can we cleanup this?
                for (var i = 0; i < _this.data.length; i++) {
                    _this.data[i].reportingPeriod = currentFP;
                }
            });
        }
        else {
            this.Message = "Please select current fiscal period to generate.";
            this.MessageType = 2; //MessageType 1 : alert success & MessageType 2 is for danger
        }
    };
    SlpComponent.prototype.Save = function () {
        if (this.isValidHandsonData) {
            this.Message = "Saved Successfully";
            this.MessageType = 1; //MessageType 1 : alert success & MessageType 2 is for danger
        }
    };
    //**Actions and Events End
    SlpComponent.prototype.GetReportingPeriods = function () {
        var mainThis = this;
        this._slpService.GetReportingPeriods().subscribe(function (result) {
            mainThis.periods = result;
            var allRP = new ReportingPeriod();
            allRP.id = 0;
            allRP.period = "All";
            mainThis.periods.unshift(allRP);
            mainThis.selectedPeriod = allRP;
            mainThis.GetSLPData(mainThis.selectedPeriod.period);
        });
    };
    SlpComponent.prototype.GetSLPData = function (fiscalYear) {
        var _this = this;
        this._slpService.GetSlps(fiscalYear, '').subscribe(function (result) {
            _this.data = result;
        });
    };
    SlpComponent.prototype.getCurrentP = function () {
        var d = new Date();
        var currentMonth = d.getMonth();
        return currentMonth;
    };
    SlpComponent.prototype.getCurrentY = function () {
        var d = new Date();
        var fiscalYear = d.getFullYear();
        return fiscalYear;
    };
    SlpComponent.prototype.GetPreviousFP = function () {
        var minusCurrentPeriod = this.getCurrentP() + 11;
        var plusCurrentPeriod = this.getCurrentP() - 1;
        if (this.getCurrentP() == 1)
            return (this.getCurrentY() - 1) + "-" + ('0' + minusCurrentPeriod).slice(-2);
        else
            return this.getCurrentY() + "-" + ('0' + plusCurrentPeriod).slice(-2);
    };
    SlpComponent.prototype.SetHeaders = function () {
        this.colHeaders.push('Supplier');
        this.colWidths.push(100);
        this.columns.push({
            data: "supplierName",
            readOnly: true
        });
        this.colHeaders.push('SCID');
        this.colWidths.push(100);
        this.columns.push({
            data: "scid",
            readOnly: true
        });
        this.colHeaders.push('Contract ID');
        this.colWidths.push(100);
        this.columns.push({
            data: "contractId",
            readOnly: true
        });
        this.colHeaders.push('Application Group');
        this.colWidths.push(250);
        this.columns.push({
            data: "applicationGroup",
            readOnly: true
        });
        this.colHeaders.push('Crest Level 1 Service');
        this.colWidths.push(250);
        this.columns.push({
            data: "crestLevel1",
            readOnly: true
        });
        this.colHeaders.push('Crest Level 2 Service');
        this.colWidths.push(250);
        this.columns.push({
            data: "crestLevel2",
            readOnly: true
        });
        this.colHeaders.push('SLA ID');
        this.colWidths.push(100);
        this.columns.push({
            data: "slaId",
            readOnly: true
        });
        this.colHeaders.push('Service Metric');
        this.colWidths.push(250);
        this.columns.push({
            data: "serviceMetric",
            readOnly: true
        });
        this.colHeaders.push('Service Class');
        this.colWidths.push(100);
        this.columns.push({
            data: "serviceClass",
            readOnly: true
        });
        this.colHeaders.push('Severity Level');
        this.colWidths.push(100);
        this.columns.push({
            data: "severityLevel",
            readOnly: true
        });
        this.colHeaders.push('Priority Level');
        this.colWidths.push(100);
        this.columns.push({
            data: "priorityLevel",
            readOnly: true
        });
        this.colHeaders.push('Environment');
        this.colWidths.push(100);
        this.columns.push({
            data: "environment",
            readOnly: true
        });
        this.colHeaders.push('Custom');
        this.colWidths.push(100);
        this.columns.push({
            data: "isCustom",
            readOnly: true
        });
        this.colHeaders.push('Minimum Level');
        this.colWidths.push(100);
        this.columns.push({
            data: "minimumLevel",
            readOnly: true
        });
        this.colHeaders.push('Target Level');
        this.colWidths.push(100);
        this.columns.push({
            data: "targetLevel",
            readOnly: true
        });
        this.colHeaders.push('Weight');
        this.colWidths.push(100);
        this.columns.push({
            data: "weightage",
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
        this.colWidths.push(200);
        this.columns.push({
            data: "reportingPeriod",
            readOnly: true
        });
        this.colHeaders.push('Pref');
        this.colWidths.push(60);
        this.columns.push({
            data: "pref",
            readOnly: true
        });
        this.colHeaders.push('Type');
        this.colWidths.push(60);
        this.columns.push({
            data: "type",
            readOnly: true
        });
        this.colHeaders.push('Value');
        this.colWidths.push(60);
        this.columns.push({
            data: "value",
            validator: this.valueRegexValidator,
            renderer: this.ValueRenderer,
            mainThis: this
        });
        this.colHeaders.push('Value Remarks');
        this.colWidths.push(500);
        this.columns.push({
            data: "valueRemarks",
            validator: this.remarksRegexValidtor,
            mainThis: this
        });
        this.colHeaders.push('Status');
        this.colWidths.push(50);
        this.columns.push({
            data: "chk",
            readOnly: true,
            renderer: this.statusRenderer,
            mainThis: this
        });
        this.options = {
            height: 750,
            stretchH: 'all',
            columnSorting: true,
            className: 'htCenter htMiddle',
            colHeaders: this.colHeaders,
            manualColumnResize: true
        };
    };
    SlpComponent.prototype.ValueRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        var previousFP = cellProperties.mainThis.GetPreviousFP();
        var reportingPeriod = cellProperties.mainThis.data[row].reportingPeriod;
        if (reportingPeriod = previousFP) {
            cellProperties.readOnly = true;
        }
        /**********validate whether entered value is valid based on minimumLevel value**********/
        cellProperties.mainThis.ValidateValue(instance, td, row, col, prop, value, cellProperties);
        /*******Set Value remarks column**********/
        var data = cellProperties.mainThis.data;
        var status = cellProperties.mainThis._slpBusiness.GetStatus(data[row]);
        if (status == "1") {
            var valueRemarksCell = instance.getCellMeta(row, col + 1);
            valueRemarksCell.valid = false;
            cellProperties.mainThis.isValidHandsonData = false;
        }
        else
            cellProperties.mainThis.isValidHandsonData = true;
        /***********Set status column**********/
        if (value != "NA" || value) {
            var tdStatus = instance.getCell(row, col + 2, true);
            cellProperties.mainThis.statusRenderer(instance, tdStatus, row, col + 2, prop, '', cellProperties);
        }
        td.innerText = value;
        return td;
    };
    ;
    SlpComponent.prototype.ValidateValue = function (instance, td, row, col, prop, value, cellProperties) {
        var tdMinimumValue = instance.getDataAtCell(row, 14);
        //check for percentage and numbers
        if ((tdMinimumValue.charAt(tdMinimumValue.length - 1) == "%" && value && value.charAt(value.length - 1) != "%")
            || tdMinimumValue.charAt(tdMinimumValue.length - 1) != "%" && value && (value.charAt(value.length - 1) == "%")) {
            var valuesCell = instance.getCellMeta(row, col);
            valuesCell.valid = false;
            //td.style.backgroundColor = ''
            cellProperties.mainThis.isValidHandsonData = false;
        }
        else
            cellProperties.mainThis.isValidHandsonData = true;
    };
    SlpComponent.prototype.statusRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        var data = cellProperties.mainThis.data;
        var result = cellProperties.mainThis._slpBusiness.GetStatus(data[row]);
        if (td !== undefined) {
            td = cellProperties.mainThis.FormatCellValue(result, td);
            td.innerText = "";
            return td;
        }
    };
    ;
    SlpComponent.prototype.FormatCellValue = function (status, td) {
        if (td !== undefined) {
            if (status == "3")
                td.style.backgroundColor = "#008000"; //green
            else if (status == "2")
                td.style.backgroundColor = "#FFFF00"; //yellow
            else if (status == "1")
                td.style.backgroundColor = "#FF0000"; //red
            else if (status == "NA")
                td.innerText = "NA";
            return td;
        }
    };
    return SlpComponent;
}());
SlpComponent = __decorate([
    Component({
        selector: 'sla-slp',
        templateUrl: './slp.component.html',
    }),
    __metadata("design:paramtypes", [SlpService, SlpBusiness])
], SlpComponent);
export { SlpComponent };
//# sourceMappingURL=slp.component.js.map