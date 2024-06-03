import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../../../src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FormioModule } from 'angular-formio';
import { HistoryComponent } from './history/history.component';
import { NestableModule } from 'ngx-nestable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HistoryRoutingModule} from './history-routing.module'
@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FormioModule,
    HistoryRoutingModule,
    NestableModule,
    AgGridModule.withComponents([]),
    
  ],
  providers: [DatePipe]
})
export class HistoryModule { }
