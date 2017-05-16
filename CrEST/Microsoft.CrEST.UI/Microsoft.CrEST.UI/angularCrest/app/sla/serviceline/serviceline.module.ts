import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { AutoCompleteComponent } from '../../shared/autocomplete/autocomplete.component'
import { UserFilterPipe } from '../../shared/pipe/userfilter.pipe';
import { SharedModule } from '../../shared/shared.module';
import { SlaServiceComponent } from './serviceline.component';
import { ServicelineFormComponent } from './serviceformaddupdate.component';
import { Sservice } from '../shared/services/service.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
      HttpModule,
      SharedModule,
      BrowserModule
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
export class SlaServiceModule { }
