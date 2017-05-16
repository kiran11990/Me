import { Component, NgModule } from '@angular/core';

import { SowModule } from "./sow/sow.module";
import { SlaServiceModule } from "./serviceline/serviceline.module";
import { SlaApplicationModule } from "./application/application.module";
import { SlpModule } from "./slp/slp.module";
import { SlaRouting } from "./sla.routing";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SowModule, SlaServiceModule, SlaApplicationModule, SlpModule, SlaRouting, SharedModule],
})
export class SlaModule { }