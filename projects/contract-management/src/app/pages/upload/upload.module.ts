import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { AllComponent } from './all-notification/all.component';
import { SharedModule } from '../../../../src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FormioModule } from 'angular-formio';
import { NestableModule } from 'ngx-nestable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUploadComponent } from './create-upload/create-upload.component';
import {UploadRoutingModule} from './upload-routing.module'
import { DndListModule } from 'ngx-drag-and-drop-lists';
import { AllUploadComponent } from './all-upload/all-upload.component';

@NgModule({
  declarations: [ CreateUploadComponent, AllUploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    DndListModule,
    ReactiveFormsModule,
    UploadRoutingModule,
    FormioModule,
    NestableModule,
    AgGridModule.withComponents([]),
  ],
  providers: [DatePipe]
})
export class UploadModule { }
