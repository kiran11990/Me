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
import { SowService } from '../shared/services/sows.service';
import { SlpService } from '../shared/services/slp.service';
import { ExportToExcel } from '../shared/models/exportToExcel';
import { ReportingPeriod } from '../shared/models/reportingperiod';
import { AngularToCsv } from '../../shared/AngularTocsv';
var SlaDashboardComponent = (function () {
    function SlaDashboardComponent(sowService, slpService) {
        this.sowService = sowService;
        this.slpService = slpService;
        this.sowData = [];
        this.sowBarChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.sowBarChartLabels = [];
        this.sowBarChartType = 'bar';
        this.sowBarChartLegend = true;
        this.sowBarChartData = [];
        this.isDataAvailable = false;
        this.contractIds = [];
        this.slps = [];
        this.periods = [];
        this.exportToExcel = new ExportToExcel();
        this.GetActiveContractIdsBarChart();
        this.GetActiveContracts();
        this.GetRASlps();
        this.GetReportingPeriods();
    }
    SlaDashboardComponent.prototype.onChange = function (selectedPeriod, _this) {
        this.currentSelectedPeriod = selectedPeriod;
        this.selectedPeriod.period = selectedPeriod;
    };
    SlaDashboardComponent.prototype.ExportToExport = function (fiscalPeriod, mainThis) {
        this.slpService.ExportToExcel(fiscalPeriod.period)
            .subscribe(function (data) {
            mainThis.exportToExcel = data;
            var options = {
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalseparator: '.',
                showLabels: true
            };
            new AngularToCsv(mainThis.exportToExcel.sows, "SoWs", options);
            new AngularToCsv(mainThis.exportToExcel.services, "Services", options);
            new AngularToCsv(mainThis.exportToExcel.applications, "Applications", options);
            new AngularToCsv(mainThis.exportToExcel.slps, "Service Level Performance", options);
        });
    };
    SlaDashboardComponent.prototype.GetActiveContractIdsBarChart = function () {
        var mainthis = this;
        this.sowService.getSows()
            .subscribe(function (data) {
            mainthis.sowData = data;
            mainthis.sowBarChartLabels = mainthis.sowData.map(function (obj) { return obj.itorgName; });
            mainthis.sowBarChartLabels = mainthis.sowBarChartLabels.filter(function (v, i) { return mainthis.sowBarChartLabels.indexOf(v) == i; });
            var sesitYr1 = 0;
            var sesitYr2 = 0;
            var sesitYr3 = 0;
            var sesitYr4 = 0;
            var fipsYr1 = 0;
            var fipsYr2 = 0;
            var fipsYr3 = 0;
            var fipsYr4 = 0;
            var ecYr1 = 0;
            var ecYr2 = 0;
            var ecYr3 = 0;
            var ecYr4 = 0;
            var mpsitYr1 = 0;
            var mpsitYr2 = 0;
            var mpsitYr3 = 0;
            var mpsitYr4 = 0;
            for (var i = 0; i < mainthis.sowBarChartLabels.length; i++) {
                var items = mainthis.sowData.filter(function (res) {
                    if (res.itorgName == mainthis.sowBarChartLabels[i])
                        return res;
                });
                switch (mainthis.sowBarChartLabels[i]) {
                    case "SESIT": {
                        items.map(function (obj) {
                            sesitYr1 = sesitYr1 + obj.sowamountYear1;
                            sesitYr2 = sesitYr2 + obj.sowamountYear2;
                            sesitYr3 = sesitYr3 + obj.sowamountYear3;
                            sesitYr4 = sesitYr4 + obj.sowamountYear4;
                        });
                        break;
                    }
                    case "EC": {
                        items.map(function (obj) {
                            ecYr1 = ecYr1 + obj.sowamountYear1;
                            ecYr2 = ecYr2 + obj.sowamountYear2;
                            ecYr3 = ecYr3 + obj.sowamountYear3;
                            ecYr4 = ecYr4 + obj.sowamountYear4;
                        });
                        break;
                    }
                    case "FiPS": {
                        items.map(function (obj) {
                            fipsYr1 = fipsYr1 + obj.sowamountYear1;
                            fipsYr2 = fipsYr2 + obj.sowamountYear2;
                            fipsYr3 = fipsYr3 + obj.sowamountYear3;
                            fipsYr4 = fipsYr4 + obj.sowamountYear4;
                        });
                        break;
                    }
                    case "MPSIT": {
                        items.map(function (obj) {
                            mpsitYr1 = mpsitYr1 + obj.sowamountYear1;
                            mpsitYr2 = mpsitYr2 + obj.sowamountYear2;
                            mpsitYr3 = mpsitYr3 + obj.sowamountYear3;
                            mpsitYr4 = mpsitYr4 + obj.sowamountYear4;
                        });
                        break;
                    }
                    default: break;
                }
            }
            mainthis.sowBarChartData = [
                { data: [sesitYr1, fipsYr1, ecYr1, mpsitYr1], label: 'Year 1' },
                { data: [sesitYr2, fipsYr2, ecYr2, mpsitYr2], label: 'Year 2' },
                { data: [sesitYr3, fipsYr3, ecYr3, mpsitYr3], label: 'Year 3' },
                { data: [sesitYr4, fipsYr4, ecYr4, mpsitYr4], label: 'Year 4' }
            ];
            mainthis.isDataAvailable = true;
        });
    };
    SlaDashboardComponent.prototype.GetActiveContracts = function () {
        var mainthis = this;
        this.sowService.getActiveContracts()
            .subscribe(function (data) {
            mainthis.contractIds = data;
        });
    };
    SlaDashboardComponent.prototype.GetRASlps = function () {
        var mainthis = this;
        this.slpService.GetRASlps()
            .subscribe(function (data) {
            mainthis.slps = data;
        });
    };
    SlaDashboardComponent.prototype.GetReportingPeriods = function () {
        var _this = this;
        var mainThis = this;
        this.slpService.GetReportingPeriods().subscribe(function (result) {
            mainThis.periods = result;
            var allRP = new ReportingPeriod();
            allRP.id = 0;
            allRP.period = "All";
            mainThis.periods.unshift(allRP);
            var currentFP = mainThis.GetPreviousFP();
            var selectedFP = _this.periods.find(function (node) {
                return node.period == currentFP;
            });
            mainThis.selectedPeriod = selectedFP;
        });
    };
    SlaDashboardComponent.prototype.getCurrentP = function () {
        var d = new Date();
        var currentMonth = d.getMonth() + 1;
        return currentMonth;
    };
    SlaDashboardComponent.prototype.getCurrentY = function () {
        var d = new Date();
        var fiscalYear = d.getFullYear();
        return fiscalYear;
    };
    SlaDashboardComponent.prototype.GetPreviousFP = function () {
        var minusCurrentPeriod = this.getCurrentP() + 11;
        var plusCurrentPeriod = this.getCurrentP() - 1;
        if (this.getCurrentP() == 1)
            return (this.getCurrentY() - 1) + "-" + ('0' + minusCurrentPeriod).slice(-2);
        else
            return this.getCurrentY() + "-" + ('0' + plusCurrentPeriod).slice(-2);
    };
    return SlaDashboardComponent;
}());
SlaDashboardComponent = __decorate([
    Component({
        selector: 'sla-dashboard',
        templateUrl: './dashboard.component.html',
    }),
    __metadata("design:paramtypes", [SowService, SlpService])
], SlaDashboardComponent);
export { SlaDashboardComponent };
//# sourceMappingURL=dashboard.component.js.map