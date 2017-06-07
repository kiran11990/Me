import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart.js';

import { SlaDashboardComponent } from './dashboard.component';
import { SowModule } from "../sow/sow.module";
import { SowService } from '../shared/services/sows.service';
import { SlpModule } from "../slp/slp.module";
import { SlpService } from '../shared/services/slp.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        ChartsModule,
        SowModule,
        SlpModule
    ],
    declarations: [
        SlaDashboardComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [SowService, SlpService]
})
export class SlaDashboardModule { }
