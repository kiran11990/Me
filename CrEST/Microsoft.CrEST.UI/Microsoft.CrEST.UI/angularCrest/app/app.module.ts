import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ConfigService, ConstantService, CommonService } from './shared/shared';


import { SlaModule } from "./sla/sla.module";
import { SharedModule } from './shared/shared.module';
import { Routing } from './app.routing';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, SlaModule, Routing, SharedModule, CommonModule, ReactiveFormsModule],
    declarations: [AppComponent, HomeComponent, NavigationComponent, NotFoundComponent],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [

        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ConfigService, ConstantService, CommonService,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: ConfigService) => () => config.load(),
            deps: [ConfigService],
            multi: true
        }
    ]
})
export class AppModule { }
