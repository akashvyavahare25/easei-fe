import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { MasterManagementRoutingModule } from './master-management-routing.module'
import { MasterDetailsComponent } from './master-details/master-details.component'
import { MasterFormRenderComponent } from './master-form-render/master-form-render.component'
import { MasterListComponent } from './master-list/master-list.component'
import { SharedModule } from '../../../app/shared.module'
import { AgGridModule } from 'ag-grid-angular'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { FormioModule } from 'angular-formio'

@NgModule({
  declarations: [MasterDetailsComponent, MasterListComponent, MasterFormRenderComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    MasterManagementRoutingModule,
    NzSelectModule,
    NzIconModule,
    AgGridModule.withComponents([]),
  ],
  providers: [DatePipe]
})
export class MasterManagementModule { }
