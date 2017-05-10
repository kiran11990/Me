import { NgModule, Component, ViewChild, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { HotTableModule } from 'ng2-handsontable';

import { SlpService } from "../shared/services/slp.service";
import { Slp } from "../shared/models/slp";
//import { PaginationComponent, FilterEvent } from './pagination.component';
//import { PaginationSorter } from './PaginationSorter'; 
/*import { PaginationComponent, FilterEvent } from '../../shared/pagination/pagination.component';
import { PaginationSorter } from '../../shared/pagination/PaginationSorter'; 

@NgModule({
    declarations: [PaginationComponent, PaginationSorter]

})*/

@Component({
    selector: 'sla-slp',
    templateUrl: './slp.component.html',
})

export class SlpComponent implements OnInit {
    data: Array<any> = [];
    colHeaders: Array<string> = [];
    columns: Array<any> = [];
    colWidths: Array<number> = [];
    options: any;
    percentRegex: any = "^(0|[1-9]\d?)\.\d{4}|100\.0000%$";

    //@ViewChild(PaginationComponent)
    //private pagination: PaginationComponent;

    constructor(private slpService: SlpService) {
    }

    ngOnInit() {
        this.SetHeaders();
        this.GetData();
    }

    //**Actions and Events Start
    Generate() {
        this.slpService.GenerateSLPforCurrentPeriod()
            .subscribe(result => {
                this.data.push(result);
            });
    }

    AutoFill() {

    }
    
    Save()
    {
        this.slpService.SaveSLPs(this.data)
            .subscribe(data => {
                this.data = data;
            });
    }
    //**Actions and Events End


    private afterChange(changes: any)
    {
        if (changes && changes.length > 0) {
            debugger;
            var row = changes[0][0];
        }
    }


    private GetData() {
        this.slpService.getCurrentPeriodSlp()
            .subscribe(data => {
                this.data = data;
            });
    }

    private ValueValidator(value: any, callback: any) {
        //if (!value || 0 === value.length) {
        //    callback(false);
        //} else {
        //    if ("^(0|[1-9]\d?)\.\d{4}|100\.0000$".(value)) {
        //        callback(true);
        //    } else {
        //        callback(false);
        //    }
        //}

    }

    private SetHeaders() {
        this.options = {
            height: 396,
            stretchH: 'all',
            columnSorting: true,
            className: 'htCenter htMiddle',
            colHeaders: this.colHeaders,
        };

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
            //validator: this.ValueValidator()
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
    }
}
