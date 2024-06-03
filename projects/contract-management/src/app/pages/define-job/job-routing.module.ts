import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { AllJobComponent } from './all-job/all-job.component'
import { CreateJobComponent } from './create-job/create-job.component'
import { JobDetailsComponent } from './job-details/job-details.component'

// dashboard
const routes: Routes = [
  {
    path: 'create',
    component: CreateJobComponent,
    canActivate: [AuthGuard],
    data: { title: 'create', permission: 'job:create' },
  },
  {
    path: 'all',
    component: AllJobComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: 'job:all' },
  },
  {
    path: 'details/:jobName',
    component: JobDetailsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Job Details', permission: 'job:show' },
  },
  {
    path: 'edit/:id',
    component: CreateJobComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit', permission: 'job:edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class JobRouterModule { }
