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
    percentageRegexValidator = /^(\d\d?(\.\d\d?)?%|100(\.00?)?%|NA|na|\d)$/;
    remarksRegexValidtor = /^[ A-Za-z0-9_@./#&+-]*$/;

    constructor(private _slpService: SlpService, private _slpBusiness: SlpBusiness) {
        this.periods = new Array<ReportingPeriod>();
        this.periods = new Array<ReportingPeriod>();
    }

    ngOnInit() {
        this.GetReportingPeriods();
        this.SetHeaders();
    }

    //**Actions and Events Start
    onChange(newObj: any) {
        this.Message = "";
        this.currentSelectedPeriod = newObj;
        this.GetSLPData(newObj);
    }

    Generate(fiscalYear: string) {
        this.Message = "";
        var _this = this;
        var currentFP = this.getCurrentFiscalY() + "-" + this.getCurrentFiscalP();
        var previousFP = this.GetPreviousFP();

        //TODO: wont wrk on year change
        //var nextFP = this.getCurrentFiscalY() + "-" + (this.getCurrentFiscalP() + 1);

        if (currentFP == fiscalYear) {
            this._slpService.GenerateSLPforCurrentPeriod()
                .subscribe(result => {
                    _this.data = result.filter(res => {
                        return res.reportingPeriod == previousFP;
                    });

                    //TODO : can we cleanup this?
                    for (var i = 0; i < _this.data.length; i++) {
                        _this.data[i].reportingPeriod = currentFP;
                        _this.data[i].value = "";
                        _this.data[i].valueRemarks = "";
                    }
                });
        } else {
            this.Message = "Please select current fiscal period to generate.";
            this.MessageType = 2;  //MessageType 1 : alert success & MessageType 2 is for danger
        }
    }

    AutoFill(fiscalYear: string) {
        this.Message = "";
        var _this = this;
        //TODO o focus on previous period not current
        var currentFP = this.getCurrentFiscalY() + "-" + this.getCurrentFiscalP();
        var previousFP = this.GetPreviousFP();

        if (currentFP == fiscalYear) {
            this._slpService.GenerateSLPforCurrentPeriod()
                .subscribe(result => {
                    _this.data = result.filter(res => {
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
        this.Message = "Saved Successfully";
        this.MessageType = 1;  //MessageType 1 : alert success & MessageType 2 is for danger
        //this._slpService.SaveSLPs(this.data)
        //    .subscribe(data => {
        //        this.data = data;
        //    });
    }

    afterChange()
    {

    }
    //**Actions and Events End

    private GetReportingPeriods() {
        var _this = this;
        this._slpService.GetReportingPeriods().subscribe((result: Array<ReportingPeriod>) => {
            _this.periods = result;
            _this.selectedPeriod = _this.periods[0];
            _this.selectedPeriod.id = _this.periods[0].id;
            _this.GetSLPData(_this.selectedPeriod.fiscalYear)
        });
    }

    private GetSLPData(fiscalYear: string) {
        var _this = this;
        this._slpService.GetSlpByPeriod(fiscalYear).subscribe((result: Array<Slp>) => {
            //TODO : can we cleanup this?
            if (fiscalYear != "All") {
                _this.data = result.filter(res => {
                    return res.reportingPeriod == fiscalYear;
                });
            } else {
                _this.data = result;
            }
        });
    }

    private getCurrentFiscalP() {
        var d = new Date();
        var currentMonth = d.getMonth() + 1;
        var fiscalMonth = currentMonth + 6;
        if (fiscalMonth > 12) {
            fiscalMonth = fiscalMonth - 12;
        }
        return fiscalMonth;
    }

    private getCurrentFiscalY() {
        var d = new Date();
        var fiscalYear;
        if (d.getMonth() > 8)
        { fiscalYear = d.getFullYear() + 1; }
        else {
            fiscalYear = d.getFullYear();
        }
        return fiscalYear;
    }

    private GetPreviousFP() {
        if (this.getCurrentFiscalP() == 1)
            return (this.getCurrentFiscalY() - 1) + "-" + (this.getCurrentFiscalP() + 11);
        else
            return this.getCurrentFiscalY() + "-" + (this.getCurrentFiscalP() - 1);
    }
    
    private SetHeaders() {

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
            validator: this.percentageRegexValidator,
            mainThis: this
        });

        this.colHeaders.push('Value Remarks');
        this.colWidths.push(100);
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
            height: 396,
            stretchH: 'all',
            columnSorting: true,
            className: 'htCenter htMiddle',
            colHeaders: this.colHeaders
        };
    }

    statusRenderer(instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) {
        var data = cellProperties.mainThis.data;
        var result = cellProperties.mainThis._slpBusiness.GetStatus(data[row]);
        data[row] = result;
    };
}
