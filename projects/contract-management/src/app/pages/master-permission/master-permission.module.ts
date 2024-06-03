import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule, NzSelectModule, NzSwitchModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { MasterPermissionComponent } from './master-permission/master-permission.component';
import { masterPermissionRoute } from './master-permission-routing';



@NgModule({
  declarations: [MasterPermissionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    SharedModule,
    masterPermissionRoute,
    AgGridModule.withComponents([]),
  ]
})
export class MasterPermissionModule { }
