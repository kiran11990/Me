import { NgModule, Component, ViewChild, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { Validators } from '@angular/forms'
import { HotTableModule } from 'ng2-handsontable';

import { SlpService } from "../shared/services/slp.service";
import { SlpBusiness } from "../shared/business/slp.business";
import { ReportingPeriod } from "../shared/models/reportingperiod";
import { slaData } from "../shared/models/slp";
import { HandsonCells } from "../shared/models/handson";
import { ConstantService } from "../../config/constants.service";

@Component({
    selector: 'sla-slp',
    templateUrl: './slp.component.html',
})

export class SlpComponent implements OnInit {
    data: Array<any> = [];
    colHeaders: Array<string> = [];
    columns: Array<any> = [];
    colWidths: Array<number> = [];
    Message: any;
    MessageType: any;
    options: any;
    public selectedPeriod: ReportingPeriod;
    public periods: Array<ReportingPeriod>;
    public currentSelectedPeriod: any
    valueRegexValidator = /^(\d\d?(\.\d\d?)?%|100(\.00?)?%|NA|na|\d)$/;
    remarksRegexValidtor = /^[ A-Za-z0-9_@./#&+-]*$/;
    showGenerateAction: boolean = false;
    showSaveAction: boolean = false;
    invalidHandsonCells: Array<HandsonCells> = [];

    INF0001: string;
    INF0002: string;
    ERR0001: string;
    ERR0002: string;
    ERR0003: string;
    ERR0004: string;

    constructor(private _slpService: SlpService, private _slpBusiness: SlpBusiness, private _constantService: ConstantService) {
        this.periods = new Array<ReportingPeriod>();

        this.INF0001 = _constantService.CONSTANTS.Messages.INF0001;
        this.INF0002 = _constantService.CONSTANTS.Messages.INF0002;

        this.ERR0001 = _constantService.CONSTANTS.Messages.ERR0001;
        this.ERR0002 = _constantService.CONSTANTS.Messages.ERR0002;
        this.ERR0003 = _constantService.CONSTANTS.Messages.ERR0003;
        this.ERR0004 = _constantService.CONSTANTS.Messages.ERR0004;
    }

    ngOnInit() {
        this.GetReportingPeriods();
        this.SetHeaders();
    }

    //**Actions and Events Start
    onChange(selectedPeriod: any, _this: any) {
        _this.Message = "";
        _this.selectedPeriod = selectedPeriod;

        _this.currentSelectedPeriod = selectedPeriod.period;
        _this.SetActionButton(_this);

        this.GetSLPData(selectedPeriod.period);
    }

    Generate(fiscalYear: string, _this: any) {
        _this.Message = "";

        //TODO
        this._slpService.GenerateSLPforCurrentPeriod(fiscalYear, "supraja_tatichetla")
            .subscribe((result: any) => {
                if (result == "INF1000") {
                    _this.Message = _this.INF0002;
                    _this.MessageType = 1;
                    _this.GetSLPData(fiscalYear);
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
    }

    Save(mainThis: any) {
        mainThis.Message = "";
        if (mainThis.invalidHandsonCells.length <= 0) {
            //TODO
            mainThis.data.map(function (item: any) {
                item.lastModifiedBy = "supraja_tatichetla";
                return item;
            })

            this._slpService.SaveSLPs(mainThis.data)
                .subscribe((result: any) => {
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
    }
    //**Actions and Events End

    private GetReportingPeriods() {
        var mainThis = this;
        this._slpService.GetReportingPeriods().subscribe((result: Array<ReportingPeriod>) => {
            mainThis.periods = result;
            var allRP: ReportingPeriod = new ReportingPeriod();
            allRP.id = 0;
            allRP.period = "All";
            mainThis.periods.unshift(allRP);

            var currentFP = mainThis.GetPreviousFP();
            var selectedFP = this.periods.find(function (node) {
                return node.period == currentFP;
            });

            mainThis.selectedPeriod = selectedFP;
            mainThis.currentSelectedPeriod = mainThis.selectedPeriod.period;

            mainThis.SetActionButton(mainThis);

            mainThis.GetSLPData(mainThis.selectedPeriod.period);
        });
    }

    private SetActionButton(mainThis: any) {
        var currentFP = mainThis.GetCurrentFP();
        var previousFP = mainThis.GetPreviousFP();

        var d = new Date();
        var day = d.getDate();

        if (mainThis.currentSelectedPeriod == currentFP) {
            mainThis.showGenerateAction = true;
            mainThis.showSaveAction = true;
        }
        else if (mainThis.currentSelectedPeriod == previousFP && day <= 10) {
            mainThis.showGenerateAction = true;
            mainThis.showSaveAction = true;
        }
        else {
            mainThis.showGenerateAction = false;
            mainThis.showSaveAction = false;
        }
    }
    private GetSLPData(fiscalYear: string) {
        var _this = this;
        this._slpService.GetSlps(fiscalYear, '').subscribe((result: Array<slaData>) => {
            _this.data = result;
        });
    }

    private getCurrentP() {
        var d = new Date();
        var currentMonth = d.getMonth() + 1;
        return currentMonth;
    }

    private getCurrentY() {
        var d = new Date();
        var fiscalYear = d.getFullYear();
        return fiscalYear;
    }

    private GetCurrentFP() {
        return this.getCurrentY() + "-" + ('0' + this.getCurrentP()).slice(-2);
    }

    private GetPreviousFP() {
        var minusCurrentPeriod = this.getCurrentP() + 11;
        var plusCurrentPeriod = this.getCurrentP() - 1;
        if (this.getCurrentP() == 1)
            return (this.getCurrentY() - 1) + "-" + ('0' + minusCurrentPeriod).slice(-2);
        else
            return this.getCurrentY() + "-" + ('0' + plusCurrentPeriod).slice(-2);
    }

    private SetHeaders() {

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
    }

    private ValueRenderer(instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) {
        var cells: HandsonCells = new HandsonCells();
        cells.col = col;
        cells.row = row;

        /**********validate whether entered value is valid based on minimumLevel value**********/
        cellProperties.mainThis.ValidateValue(instance, td, row, col, prop, value, cellProperties, cells);

        /*******Set Value remarks column**********/
        var data = cellProperties.mainThis.data;
        var status = cellProperties.mainThis._slpBusiness.GetStatus(data[row]);
        var valueRemarksCell = instance.getCellMeta(row, col + 1);

        if (status == "1") {
            valueRemarksCell.valid = false;
            cellProperties.mainThis.invalidHandsonCells.push(cells);
        }
        else {
            valueRemarksCell.valid = true;
            for (var i = 0; i < cellProperties.mainThis.invalidHandsonCells.length; i++) {
                if (cellProperties.mainThis.invalidHandsonCells[i].row == cells.row && cellProperties.mainThis.invalidHandsonCells[i].col == cells.col) {
                    cellProperties.mainThis.invalidHandsonCells.splice(i, 1);
                }
            }
        }

        var tdValueRemarks = instance.getCell(row, col + 1, true);

        /***********Set status column**********/
        if (value != "NA" || value) {
            var tdStatus = instance.getCell(row, col + 2, true);
            cellProperties.mainThis.statusRenderer(instance, tdStatus, row, col + 2, prop, '', cellProperties);
        }

        td.innerText = value;

        return td;
    };

    private ValidateValue(instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any, cells: any) {
        var tdMinimumValue = instance.getDataAtCell(row, 14);
        var valuesCell = instance.getCellMeta(row, col);

        //check for percentage and numbers
        if ((tdMinimumValue.charAt(tdMinimumValue.length - 1) == "%" && value && value.charAt(value.length - 1) != "%")
            || tdMinimumValue.charAt(tdMinimumValue.length - 1) != "%" && value && (value.charAt(value.length - 1) == "%")) {
            valuesCell.valid = false;
            cellProperties.mainThis.invalidHandsonCells.push(cells);
        }
        else {
            valuesCell.valid = true;

            for (var i = 0; i < cellProperties.mainThis.invalidHandsonCells.length; i++) {
                if (cellProperties.mainThis.invalidHandsonCells[i].row == cells.row && cellProperties.mainThis.invalidHandsonCells[i].col == cells.col) {
                    cellProperties.mainThis.invalidHandsonCells.splice(i, 1);
                }
            }
        }

        //TODO
        if (cellProperties.mainThis.data[row].infyOwner === "karthik_ramamoorthi") {
            cellProperties.editor = false;
            td.style.background = '#EEE';
        } else {
            cellProperties.editor = 'text';
            td.style.background = '#FFFFFF';
        }
    }

    private statusRenderer(instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) {
        var data = cellProperties.mainThis.data;
        var result = cellProperties.mainThis._slpBusiness.GetStatus(data[row]);
        if (td !== undefined) {
            td = cellProperties.mainThis.FormatCellValue(result, td);
            td.innerText = "";
            return td;
        }
    };

    private FormatCellValue(status: string, td: any) {
        if (td !== undefined) {
            if (status == "3")
                td.style.backgroundColor = "#008000"; //green
            else if (status == "2")
                td.style.backgroundColor = "#FFFF00"; //yellow
            else if (status == "1")
                td.style.backgroundColor = "#FF0000"; //red
            return td;
        }
    }

}
