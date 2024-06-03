import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component'
import { AllDashboardComponent } from './all-dashboard/all-dashboard.component'

// dashboard
const routes: Routes = [
  {
    path: 'all',
    component: AllDashboardComponent,
    data: { title: 'all', permission: '-' },
  },
  {
    path: 'create',
    component: CreateDashboardComponent,
    data: { title: 'create', permission: '-' },
  },
  {
    path: 'edit/:id',
    component: CreateDashboardComponent,
    data: { title: 'edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class DashboardRouterModule { }
