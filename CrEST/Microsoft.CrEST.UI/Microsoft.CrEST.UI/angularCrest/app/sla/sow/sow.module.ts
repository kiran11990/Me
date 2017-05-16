import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SowComponent } from './landing/sow.component';
import { SowService } from '../shared/services/sows.service';
import { SowFormComponent } from './sow-form/sow-form.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule, SharedModule
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
    ]
})
export class SowModule { }
