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
import { HandsonCells } from "../shared/models/handson";
import { ConstantService } from "../../config/constants.service";
var SlpComponent = (function () {
    function SlpComponent(_slpService, _slpBusiness, _constantService) {
        this._slpService = _slpService;
        this._slpBusiness = _slpBusiness;
        this._constantService = _constantService;
        this.data = [];
        this.colHeaders = [];
        this.columns = [];
        this.colWidths = [];
        this.valueRegexValidator = /^(\d\d?(\.\d\d?)?%|100(\.00?)?%|NA|na|\d)$/;
        this.remarksRegexValidtor = /^[ A-Za-z0-9_@./#&+-]*$/;
        this.showGenerateAction = false;
        this.showSaveAction = false;
        this.invalidHandsonCells = [];
        this.periods = new Array();
        this.INF0001 = _constantService.CONSTANTS.Messages.INF0001;
        this.INF0002 = _constantService.CONSTANTS.Messages.INF0002;
        this.ERR0001 = _constantService.CONSTANTS.Messages.ERR0001;
        this.ERR0002 = _constantService.CONSTANTS.Messages.ERR0002;
        this.ERR0003 = _constantService.CONSTANTS.Messages.ERR0003;
        this.ERR0004 = _constantService.CONSTANTS.Messages.ERR0004;
    }
    SlpComponent.prototype.ngOnInit = function () {
        this.GetReportingPeriods();
        this.SetHeaders();
    };
    //**Actions and Events Start
    SlpComponent.prototype.onChange = function (selectedPeriod, _this) {
        _this.Message = "";
        _this.selectedPeriod = selectedPeriod;
        var currentFP = _this.GetCurrentFP();
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
    SlpComponent.prototype.Generate = function (fiscalYear, _this) {
        _this.Message = "";
        var currentFP = _this.GetCurrentFP();
        //TODO
        this._slpService.GenerateSLPforCurrentPeriod(currentFP, "supraja_tatichetla")
            .subscribe(function (result) {
            if (result == "INF1000") {
                _this.Message = _this.INF0002;
                _this.MessageType = 1;
                _this.GetSLPData(currentFP);
            }
            else if (result == "ERR1000") {
                _this.Message = _this.ERR0004;
                _this.MessageType = 2;
            }
            else {
                _this.Message = _this.ERR0003;
                _this.MessageType = 2;
            }
        });
    };
    SlpComponent.prototype.Save = function (mainThis) {
        debugger;
        mainThis.Message = "";
        if (mainThis.invalidHandsonCells.length <= 0) {
            //TODO
            mainThis.data.map(function (item) {
                item.lastModifiedBy = "supraja_tatichetla";
                return item;
            });
            this._slpService.SaveSLPs(mainThis.data)
                .subscribe(function (result) {
                debugger;
                if (result == "INF1000") {
                    mainThis.Message = mainThis.INF0001;
                    mainThis.MessageType = 1;
                }
                else {
                    mainThis.Message = mainThis.ERR0001;
                    mainThis.MessageType = 2;
                }
            });
        }
        else {
            mainThis.Message = mainThis.ERR0002;
            mainThis.MessageType = 2;
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
        var currentMonth = d.getMonth() + 1;
        return currentMonth;
    };
    SlpComponent.prototype.getCurrentY = function () {
        var d = new Date();
        var fiscalYear = d.getFullYear();
        return fiscalYear;
    };
    SlpComponent.prototype.GetCurrentFP = function () {
        return this.getCurrentY() + "-" + ('0' + this.getCurrentP()).slice(-2);
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
        var cells = new HandsonCells();
        cells.col = col;
        cells.row = row;
        /**********validate whether entered value is valid based on minimumLevel value**********/
        cellProperties.mainThis.ValidateValue(instance, td, row, col, prop, value, cellProperties, cells);
        /*******Set Value remarks column**********/
        var data = cellProperties.mainThis.data;
        var status = cellProperties.mainThis._slpBusiness.GetStatus(data[row]);
        if (status == "1") {
            var valueRemarksCell = instance.getCellMeta(row, col + 1);
            valueRemarksCell.valid = false;
            cellProperties.mainThis.invalidHandsonCells.push(cells);
        }
        else {
            var valueRemarksCell = instance.getCellMeta(row, col + 1);
            valueRemarksCell.valid = true;
            for (var i = 0; i < cellProperties.mainThis.invalidHandsonCells.length; i++) {
                if (cellProperties.mainThis.invalidHandsonCells[i].row == cells.row && cellProperties.mainThis.invalidHandsonCells[i].col == cells.col) {
                    cellProperties.mainThis.invalidHandsonCells.splice(i, 1);
                }
            }
        }
        /***********Set status column**********/
        if (value != "NA" || value) {
            var tdStatus = instance.getCell(row, col + 2, true);
            cellProperties.mainThis.statusRenderer(instance, tdStatus, row, col + 2, prop, '', cellProperties);
        }
        td.innerText = value;
        return td;
    };
    ;
    SlpComponent.prototype.ValidateValue = function (instance, td, row, col, prop, value, cellProperties, cells) {
        var tdMinimumValue = instance.getDataAtCell(row, 14);
        //check for percentage and numbers
        if ((tdMinimumValue.charAt(tdMinimumValue.length - 1) == "%" && value && value.charAt(value.length - 1) != "%")
            || tdMinimumValue.charAt(tdMinimumValue.length - 1) != "%" && value && (value.charAt(value.length - 1) == "%")) {
            var valuesCell = instance.getCellMeta(row, col);
            valuesCell.valid = false;
            cellProperties.mainThis.invalidHandsonCells.push(cells);
        }
        else {
            var valuesCell = instance.getCellMeta(row, col);
            valuesCell.valid = false;
            for (var i = 0; i < cellProperties.mainThis.invalidHandsonCells.length; i++) {
                if (cellProperties.mainThis.invalidHandsonCells[i].row == cells.row && cellProperties.mainThis.invalidHandsonCells[i].col == cells.col) {
                    cellProperties.mainThis.invalidHandsonCells.splice(i, 1);
                }
            }
        }
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
    __metadata("design:paramtypes", [SlpService, SlpBusiness, ConstantService])
], SlpComponent);
export { SlpComponent };
//# sourceMappingURL=slp.component.js.map