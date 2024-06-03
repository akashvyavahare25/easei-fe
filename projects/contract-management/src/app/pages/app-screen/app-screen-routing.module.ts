import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Screenguard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { AllAppScreenComponent } from './all-app-screen/all-app-screen.component'
import { CreateAppScreenComponent } from './create-app-screen/create-app-screen.component'
import { ReportAppScreenComponent } from './report-app-screen/report-app-screen.component'
import { DashboardsComponent } from './dashboards/dashboards.component'
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component'

// dashboard
const routes: Routes = [
  {
    path: 'create/:screenname/:id',
    canActivate: [AuthGuard],
    component: CreateAppScreenComponent,
    data: { title: 'create', permission: ':create' },
  },
  {
    path: 'all/:screenname/:screenId',
    component: AllAppScreenComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: ':all' },
  },
  {
    path: 'edit/:id',
    component: CreateAppScreenComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit', permission: ':edit' },
  },
  {
    path: 'create/:screenname/:id/:code/:editId',
    component: CreateAppScreenComponent,
    canActivate: [AuthGuard],
    data: { title: 'create', permission: ':create' },
  },
  {
    path: 'report/:screenname/:code',
    component: ReportAppScreenComponent,
    canActivate: [AuthGuard],
    data: { title: 'report', permission: ':all' },
  },
  {
    path: 'dashboard',
    component: DashboardsComponent,
    canActivate: [AuthGuard],
    data: { title: 'report', permission: 'dashboard' },
  },
  {
    path: 'dashboard/:id',
    canActivate: [AuthGuard],
    component: AppDashboardComponent,
    data: { title: 'app-dashboard', permission: ':create' },
  },
  
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppScreenRouterModule { }
