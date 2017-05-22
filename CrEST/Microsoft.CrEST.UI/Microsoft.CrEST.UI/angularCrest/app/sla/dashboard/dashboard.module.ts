import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart.js';

import { SlaDashboardComponent } from './dashboard.component';
import { SowModule } from "../sow/sow.module";
import { SowService } from '../shared/services/sows.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        ChartsModule,
        SowModule
    ],
    declarations: [
        SlaDashboardComponent
    ],
    providers: [SowService]
})
export class SlaDashboardModule { }
