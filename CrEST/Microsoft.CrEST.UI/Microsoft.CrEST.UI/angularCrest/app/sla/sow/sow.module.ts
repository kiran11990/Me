import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SowComponent } from './landing/sow.component';
import { SowService } from '../shared/services/sows.service';
import { SowFormComponent } from './sow-form/sow-form.component';
import { SharedModule } from '../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotTableModule } from 'ng2-handsontable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        HotTableModule,
        SharedModule,
        MyDatePickerModule,
        NgxPaginationModule
    ],
    declarations: [
        SowComponent,
        SowFormComponent
    ],
    exports: [
        SowComponent
    ],
    providers: [
        SowService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SowModule { }
