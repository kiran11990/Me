import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HotTableModule } from 'ng2-handsontable';

import { SlpComponent } from './slp.component';
import { SlpService } from '../shared/services/slp.service';
import { SlpBusiness } from '../shared/business/slp.business';
import { ConstantService } from "../../config/constants.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        HotTableModule
    ],
    declarations: [
        SlpComponent
    ],
    exports: [
        SlpComponent
    ],
    providers: [
        SlpService, SlpBusiness, ConstantService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlpModule { }
