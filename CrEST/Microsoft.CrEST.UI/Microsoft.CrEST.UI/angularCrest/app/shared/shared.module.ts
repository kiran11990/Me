import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { AutoCompleteComponent } from '../shared/autocomplete/autocomplete.component'
import { UserFilterPipe } from '../shared/pipe/userfilter.pipe';
import { SearchPipe } from '../shared/pipe/search.pipe';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [BrowserModule, MyDatePickerModule,
        FormsModule],
    declarations: [
        AutoCompleteComponent, UserFilterPipe, SearchPipe],
    exports: [AutoCompleteComponent, UserFilterPipe, SearchPipe, MyDatePickerModule]
   
})
export class SharedModule { }
