import { Component, ViewChild, OnInit } from '@angular/core';
import { SlpService } from "../shared/services/slp.service";
import { Slp } from "../shared/models/slp";
import { CrestHandsonComponent } from "./cresthandson.component";

@Component({
    selector: 'sla-slp',
    templateUrl: './slp.component.html',
})

export class SlpComponent {
    data: Array<any> = [{ "id": "1" }, { "id": "2" }, { "id": "3" }];
    colHeaders: Array<string> = ['id'];
    columns: Array<any>= [{
        data: 'id'
    }];
    colWidths: Array<number> = [null];

    //@ViewChild(CrestHandsonComponent)
    private _crestHandsonComponent = new CrestHandsonComponent();

    constructor() {
        this._crestHandsonComponent.data = this.data;
        this._crestHandsonComponent.colHeaders = this.colHeaders;
        this._crestHandsonComponent.columns = this.columns;
        this._crestHandsonComponent.colWidths = this.colWidths;
    }
}