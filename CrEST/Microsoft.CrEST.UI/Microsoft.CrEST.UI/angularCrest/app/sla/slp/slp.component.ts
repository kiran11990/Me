import { NgModule, Component, ViewChild, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { Validators } from '@angular/forms'
import { HotTableModule } from 'ng2-handsontable';

import { SlpService } from "../shared/services/slp.service";
import { SlpBusiness } from "../shared/business/slp.business";
import { ReportingPeriod } from "../shared/models/reportingperiod";
import { Slp } from "../shared/models/slp";

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
    isValidHandsonData: boolean = true;
    showGenerateAction: boolean = false;
    showSaveAction: boolean = false;

    constructor(private _slpService: SlpService, private _slpBusiness: SlpBusiness) {
        this.periods = new Array<ReportingPeriod>();
    }

    ngOnInit() {
        this.GetReportingPeriods();
        this.SetHeaders();
    }

    //**Actions and Events Start
    onChange(selectedPeriod: any, _this: any) {
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
    }

    Generate(fiscalYear: string) {
        this.Message = "";
        var _this = this;
        var currentFP = this.getCurrentY() + "-" + this.getCurrentP();
        var previousFP = this.GetPreviousFP();

        if (currentFP == fiscalYear) {
            this._slpService.GenerateSLPforCurrentPeriod(currentFP)
                .subscribe(result => {
                    _this.data = result.filter((res:any) => {
                        return res.reportingPeriod == previousFP;
                    });

                    //TODO : can we cleanup this?
                    for (var i = 0; i < _this.data.length; i++) {
                        _this.data[i].reportingPeriod = currentFP;
                    }
                });
        } else {
            this.Message = "Please select current fiscal period to generate.";
            this.MessageType = 2;  //MessageType 1 : alert success & MessageType 2 is for danger
        }
    }

    Save() {
        if (this.isValidHandsonData) {
            this.Message = "Saved Successfully";
            this.MessageType = 1;  //MessageType 1 : alert success & MessageType 2 is for danger
            //this._slpService.SaveSLPs(this.data)
            //    .subscribe(data => {
            //        this.data = data;
            //    });
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
            mainThis.selectedPeriod = allRP;
            mainThis.GetSLPData(mainThis.selectedPeriod.period)
        });
    }

    private GetSLPData(fiscalYear: string) {
        var _this = this;
        this._slpService.GetSlps(fiscalYear, '').subscribe((result: Array<Slp>) => {
            _this.data = result;
        });
    }

    private getCurrentP() {
        var d = new Date();
        var currentMonth = d.getMonth();
        return currentMonth;
    }

    private getCurrentY() {
        var d = new Date();
        var fiscalYear = d.getFullYear();
        return fiscalYear;
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
        if (status == "1")
        {
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

    private ValidateValue(instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any)
    {
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

    private FormatCellValue(status: string, td: any)
    {
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
    }
    
}
