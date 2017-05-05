import { Component, OnInit } from '@angular/core';
import { SowService } from "../../shared/services/sows.service";
import { Sow } from "../../shared/models/sow";
import { genData } from "../../../data";
import { HotTableModule } from 'ng2-handsontable';

@Component({
    selector: 'sow-grid',
    templateUrl: './sow.component.html',
})

export class SowComponent {
    private sows: Sow[] = [];
    //Bind to hot table
    private data: Array<any>;
 
    private colHeaders: Array<string> = [
    'Supplier',
    'Service Line',
    'Contract ID',
    'SOW Effective Date',
    'SOW Expiration Date',
    'MS Owner Alias',
    'Service Catalog Version',
    'PO# Yr 1',
    'SOW Amount Yr 1',
    'SOW Amount Yr 2',
    'SOW Amount Yr 3',
    'SOW Amount Yr 4',
    'IsCrest?',
    'Remarks'
    ];

    private columns: Array<any> = [
        {
            data: 'supplier.name',
            source: 'supplier.options',
            optionField: 'name',
            type: 'autocomplete',
            strict: false,
            visibleRows: 4
        },
        {
            data: 'serviceLine.name',
            source: 'serviceLine.options',
            optionField: 'name',
            type: 'autocomplete',
            strict: false,
            visibleRows: 4
        },
        {
            data: 'contractID'
        },
        {
            data: 'effectiveDate'
        },
        {
            data: 'expirationDate',
        },
        {
            data: 'msOwnerAlias',
        },
        {
            data: 'serviceCatalogVersion',
        },
        {
            data: 'poYr1',
        },
        {
            data: 'amountYr1',
            type: 'numeric',
            format: '$ 0,0.00'
        },
        {
            data: 'amountYr2',
            type: 'numeric',
            format: '$ 0,0.00'
        },
        {
            data: 'amountYr3',
            type: 'numeric',
            format: '$ 0,0.00'
        },
        {
            data: 'amountYr4',
            type: 'numeric',
            format: '$ 0,0.00'
        },
        {
            data: 'isCrest',
            type: 'checkbox',
            checkedTemplate: 'Yes',
            uncheckedTemplate: 'No'
        },
        {
            data: 'remarks'
        }
    ];

    private colWidths: Array<number> = [
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, 30];
    private options: any = {
        stretchH: 'all',
        columnSorting: true,
        contextMenu: [
            'row_above', 'row_below', 'remove_row'
        ]
    };
    private afterChange(e: any) {
        console.log(e);
    }
    private afterOnCellMouseDown(e: any) {
        console.log(e);
    }

    constructor(private sowService: SowService) { }

    ngOnInit() {
        //this.sowService.getSows()
        //    .subscribe(data => this.sows = data);

        this.sowService.getSows()
            .subscribe(data => this.data = data);
    }

    deleteSow(sow: any) {
        if (confirm("Are you sure you want to delete " + sow.name + "?")) {
            var index = this.sows.indexOf(sow);
            this.sows.splice(index, 1);

            this.sowService.deleteSow(sow.id)
                .subscribe(null,
                err => {
                    alert("Could not delete sow.");
                    // Revert the view back to its original state
                    this.sows.splice(index, 0, sow);
                });
        }
    }

}