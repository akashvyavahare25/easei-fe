import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../layouts/layouts.module';
import { CreateReportComponent } from './create-report/create-report.component';
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { AllReportComponent } from './all-report/all-report.component';
const routes: Routes = [
  {
    path: 'create',
    component: CreateReportComponent,
    data: { title: 'report'}
  },
  {
    path: 'all',
    component: AllReportComponent,
    canActivate: [AuthGuard],
    data: { title: 'all' },
  },
  {
    path: 'edit/:id',
    component: CreateReportComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit'},
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class ReportRoutingModule { }
