import { Component, OnInit, Input, Output } from '@angular/core';
import { HotTableModule } from 'ng2-handsontable';

@Component({
    selector: 'crest-handson',
    templateUrl: './cresthandson.component.html'
})

export class CrestHandsonComponent {
    @Input() data: Array<any>;
    @Input() colHeaders: Array<string>;
    @Input() columns: Array<any>;
    @Input() colWidths: Array<number>;
    @Input() options: any;

    constructor() {
    }

    public afterChange(e: any) {
        console.log(e);
    }

    public afterOnCellMouseDown(e: any) {
        console.log(e);
    }
}