import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzSelectModule } from 'ng-zorro-antd/select' 
import { SharedModule } from 'projects/contract-management/src/app/shared.module'
import { AgGridModule } from 'ag-grid-angular'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { RoleManagementRoutingModule } from './role-managemente-rouuting-module';
import { RoleListComponent } from './role-list/role-list.component';

@NgModule({
  declarations: [RoleComponent, RoleListComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    RoleManagementRoutingModule,
    AgGridModule.withComponents([]),
  ]
})
export class RoleManagementModule { }
