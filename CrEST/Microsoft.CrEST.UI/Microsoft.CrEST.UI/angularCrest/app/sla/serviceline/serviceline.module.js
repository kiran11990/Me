var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';
import { SlaServiceComponent } from './serviceline.component';
import { ServicelineFormComponent } from './serviceformaddupdate.component';
import { Sservice } from '../shared/services/service.service';
import { MyDatePickerModule } from 'mydatepicker';
var SlaServiceModule = (function () {
    function SlaServiceModule() {
    }
    return SlaServiceModule;
}());
SlaServiceModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            HttpModule,
            SharedModule,
            BrowserModule,
            MyDatePickerModule
        ],
        declarations: [
            SlaServiceComponent, ServicelineFormComponent
        ],
        //exports: [
        //    SlaServiceComponent
        //],
        providers: [
            Sservice
        ]
    })
], SlaServiceModule);
export { SlaServiceModule };
//# sourceMappingURL=serviceline.module.js.map