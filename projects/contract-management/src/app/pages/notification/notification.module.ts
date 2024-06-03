import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AllComponent } from './all-notification/all.component';
import { SharedModule } from '../../../../src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationRoutingModule } from './notification-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ScreenNotificationComponent } from './screen-notification/screen-notification.component';
import { FormioModule } from 'angular-formio';
import { NestableModule } from 'ngx-nestable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AllComponent, ScreenNotificationComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FormioModule,
    NestableModule,
    AgGridModule.withComponents([]),
    NotificationRoutingModule
  ],
  providers: [DatePipe]
})
export class NotificationModule { }
