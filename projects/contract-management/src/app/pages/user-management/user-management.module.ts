import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { UserManagementRoutingModule } from './user-management-routing.module'
import { UserComponent } from './user/user.component'
import { UserListComponent } from './user-list/user-list.component'
import { SharedModule } from '../../../../src/app/shared.module'
import { AgGridModule } from 'ag-grid-angular'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzSwitchModule } from 'ng-zorro-antd/switch'

@NgModule({
  declarations: [UserComponent, UserListComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    AgGridModule.withComponents([]),
  ]
})
export class UserManagementModule { }
