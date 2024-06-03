import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow.component'
import { AllApprovalWorkflowComponent } from './all-approval-workflow/all-approval-workflow.component'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'

// approval-workflow
const routes: Routes = [
  {
    path: 'workflow',
    canActivate: [AuthGuard],
    component: ApprovalWorkflowComponent,
    data: { title: 'Workflow', permission: '-' },
  },
  {
    path: 'all',
    component: AllApprovalWorkflowComponent,
    canActivate: [AuthGuard],
    data: { title: 'All Workflow', permission: '-' },
  },
  {
    path: 'workflow/:id',
    component: ApprovalWorkflowComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit', permission: '-' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class ApprovalRouterModule { }
