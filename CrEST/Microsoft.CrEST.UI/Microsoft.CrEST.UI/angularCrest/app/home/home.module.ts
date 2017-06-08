/// <reference path="../sla/sla.module.ts" />
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SlaModule } from '../sla/sla.module';

import { HomeComponent } from './home.component';

import { NavigationComponent } from '../navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
        SlaModule,
    ],
    declarations: [HomeComponent, NavigationComponent],
    exports: [HomeComponent, NavigationComponent]
})

export class HomeModule { }
