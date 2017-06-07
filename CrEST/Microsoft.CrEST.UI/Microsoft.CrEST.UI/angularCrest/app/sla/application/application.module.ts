import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AutoCompleteComponent } from '../../shared/autocomplete/autocomplete.component'
import { UserFilterPipe } from '../../shared/pipe/userfilter.pipe';
import { SearchPipe } from '../../shared/pipe/search.pipe';
import { ApplicationService } from '../shared/services/application.service';
import { SharedModule } from '../../shared/shared.module';
import { SlaApplicationComponent } from './application.component';
import { ApplicationFormComponent } from './application-form.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        SharedModule,
        MyDatePickerModule,
        NgxPaginationModule
    ],
    declarations: [
        SlaApplicationComponent, ApplicationFormComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ApplicationService]
     //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlaApplicationModule { }
