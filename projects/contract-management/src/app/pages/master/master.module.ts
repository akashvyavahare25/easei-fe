import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
import { MasterRouterModule } from './master-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { CreateMasterComponent } from './create-master/create-master.component';
import { AllMastersComponent } from './all-masters/all-masters.component'

@NgModule({
  declarations: [CreateMasterComponent, AllMastersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MasterRouterModule,
    FormsModule,
    FormioModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class MasterModule { }
