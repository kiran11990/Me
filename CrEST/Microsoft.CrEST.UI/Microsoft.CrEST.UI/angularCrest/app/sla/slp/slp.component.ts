import { Component, OnInit } from '@angular/core';
import { SlpService } from "../shared/services/slp.service";
import { Slp } from "../shared/models/slp";
import { CrestHandsonComponent } from "./cresthandson.component";
import { HotTableModule } from 'ng2-handsontable';

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

    private crestHandsonComponent: any;

    constructor(private slpService: SlpService) {
        this.crestHandsonComponent = new CrestHandsonComponent();
    }

    ngOnInit() {
        this.SetHeaders();
        this.GetData();
        this.ConfigureHandsonTable();
    }

    //**Actions and Events Start
    Generate() {
        this.slpService.GenerateSLPforCurrentPeriod()
            .subscribe(result => {
                this.data.push(result);
                this.crestHandsonComponent.data.push(result);
            });
    }

    AutoFill() {

    }
    
    Save()
    {
        this.slpService.SaveSLPs(this.data)
            .subscribe(data => {
                this.data = data;
                this.crestHandsonComponent.data = data;
            });
    }
    //**Actions and Events End
    

    private GetData() {
        this.slpService.getCurrentPeriodSlp()
            .subscribe(data => {
                this.data = data;
                this.crestHandsonComponent.data = data;
            });
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
            data: "value"
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

    private ConfigureHandsonTable()
    {
        this.crestHandsonComponent.colHeaders = this.colHeaders;
        this.crestHandsonComponent.columns = this.columns;
        this.crestHandsonComponent.colWidths = this.colWidths;

        this.options = {
            height: 396,
            stretchH: 'all',
            columnSorting: true,
            className: 'htCenter htMiddle',
            colHeaders: this.colHeaders,
        };
        this.crestHandsonComponent.options = this.options;
    }

}
