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
var SlaDashboardComponent = (function () {
    function SlaDashboardComponent(sowService) {
        this.sowService = sowService;
        this.sowData = [];
        this.sowBarChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.sowBarChartLabels = [];
        this.sowBarChartType = 'bar';
        this.sowBarChartLegend = true;
        this.sowBarChartData = [];
        this.GetActiveContractIdsBarChart();
    }
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
        });
    };
    SlaDashboardComponent.prototype.RefreshSowBarChart = function () {
        this.GetActiveContractIdsBarChart();
    };
    return SlaDashboardComponent;
}());
SlaDashboardComponent = __decorate([
    Component({
        selector: 'sla-dashboard',
        templateUrl: './dashboard.component.html',
    }),
    __metadata("design:paramtypes", [SowService])
], SlaDashboardComponent);
export { SlaDashboardComponent };
//# sourceMappingURL=dashboard.component.js.map