var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { SlpModule } from "../slp/slp.module";
import { SlpService } from '../shared/services/slp.service';
var SlaDashboardModule = (function () {
    function SlaDashboardModule() {
    }
    return SlaDashboardModule;
}());
SlaDashboardModule = __decorate([
    NgModule({
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
        providers: [SowService, SlpService]
    })
], SlaDashboardModule);
export { SlaDashboardModule };
//# sourceMappingURL=dashboard.module.js.map