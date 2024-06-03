import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
import { ApprovalRouterModule } from './approval-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { AntdModule } from '../../../../src/app/antd.module'

import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow.component'
import { AllApprovalWorkflowComponent } from './all-approval-workflow/all-approval-workflow.component'


@NgModule({
  declarations: [ApprovalWorkflowComponent, AllApprovalWorkflowComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApprovalRouterModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    NzSelectModule,
    // NzDropDownModule,
    // AntdModule,
    AgGridModule.withComponents([])
  ]
})
export class ApprovalModule { }
