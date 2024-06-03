import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { SharedModule } from '../../../../src/app/shared.module'
import {CustomerRouterModule} from './customer-routing.module'
import { AgGridModule } from 'ag-grid-angular'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import{CreateCustomerComponent } from './create-customer/create-customer.component';
import { AllCustomerComponent } from './all-customer/all-customer.component';
import { AssignLogoComponent } from './assign-logo/assign-logo.component'
@NgModule({
  declarations: [CreateCustomerComponent, AllCustomerComponent, AssignLogoComponent,],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRouterModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    AgGridModule.withComponents([]),
  ]
})
export class  CustomerModule { }
