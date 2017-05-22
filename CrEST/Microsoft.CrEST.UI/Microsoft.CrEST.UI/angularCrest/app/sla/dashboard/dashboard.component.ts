import { Component, OnInit } from '@angular/core';
import { SowService } from '../shared/services/sows.service';
import { Sow } from '../shared/models/sow';
import { SlpService } from '../shared/services/slp.service';
import { Slp } from '../shared/models/slp';

@Component({
    selector: 'sla-dashboard',
    templateUrl: './dashboard.component.html',
})

export class SlaDashboardComponent {

    private sowData: Array<Sow> = [];
    public sowBarChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public sowBarChartLabels: string[] = [];
    public sowBarChartType: string = 'bar';
    public sowBarChartLegend: boolean = true;
    public sowBarChartData: any[] = [];
    public isDataAvailable: boolean = false;


    public contractIds: Array<Sow> = [];

    public slps: Array<Slp> = [];

    constructor(private sowService: SowService, private slpService: SlpService) {
        this.GetActiveContractIdsBarChart();
        this.GetActiveContracts();
        this.GetSlps();
    }

    private GetActiveContractIdsBarChart() {
        var mainthis = this;
        this.sowService.getSows()
            .subscribe(data => {
                mainthis.sowData = data;


                mainthis.sowBarChartLabels = mainthis.sowData.map(function (obj) { return obj.itorgName; });
                mainthis.sowBarChartLabels = mainthis.sowBarChartLabels.filter(function (v, i) { return mainthis.sowBarChartLabels.indexOf(v) == i; });

                var sesitYr1: number = 0;
                var sesitYr2: number = 0;
                var sesitYr3: number = 0;
                var sesitYr4: number = 0;
                var fipsYr1: number = 0;
                var fipsYr2: number = 0;
                var fipsYr3: number = 0;
                var fipsYr4: number = 0;
                var ecYr1: number = 0;
                var ecYr2: number = 0;
                var ecYr3: number = 0;
                var ecYr4: number = 0;
                var mpsitYr1: number = 0;
                var mpsitYr2: number = 0;
                var mpsitYr3: number = 0;
                var mpsitYr4: number = 0;


                for (var i = 0; i < mainthis.sowBarChartLabels.length; i++) {

                    var items = mainthis.sowData.filter(res => {
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
                            })
                            break;
                        }
                        case "EC": {
                            items.map(function (obj) {
                                ecYr1 = ecYr1 + obj.sowamountYear1;
                                ecYr2 = ecYr2 + obj.sowamountYear2;
                                ecYr3 = ecYr3 + obj.sowamountYear3;
                                ecYr4 = ecYr4 + obj.sowamountYear4;
                            })
                            break;
                        }
                        case "FiPS": {
                            items.map(function (obj) {
                                fipsYr1 = fipsYr1 + obj.sowamountYear1;
                                fipsYr2 = fipsYr2 + obj.sowamountYear2;
                                fipsYr3 = fipsYr3 + obj.sowamountYear3;
                                fipsYr4 = fipsYr4 + obj.sowamountYear4;
                            })
                            break;
                        }
                        case "MPSIT": {
                            items.map(function (obj) {
                                mpsitYr1 = mpsitYr1 + obj.sowamountYear1;
                                mpsitYr2 = mpsitYr2 + obj.sowamountYear2;
                                mpsitYr3 = mpsitYr3 + obj.sowamountYear3;
                                mpsitYr4 = mpsitYr4 + obj.sowamountYear4;
                            })
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
    }

    private GetActiveContracts(){
        var mainthis = this;
        this.sowService.getActiveContracts()
            .subscribe(data => {
                mainthis.contractIds = data;
            });
    }

    private GetSlps()
    {
        var mainthis = this;
        this.slpService.GetSlpsByStatus(2, "")
            .subscribe(data => {
                mainthis.slps = data;
            });
    }
}