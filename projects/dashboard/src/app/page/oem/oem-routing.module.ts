import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BcuComponent } from './bcu/bcu.component'
import { FullYearschedulingComponent } from './full-yearscheduling/full-yearscheduling.component'
import { OemBcuDashboardComponent } from './oem-ncu-dashboard/oem-ncu-dashboard.component'
import {oemDashboardComponent} from './oem-dashboard/oem-dashboard.component'
import { ScheduleingComponent } from './scheduleing/scheduleing.component'
import { WindDashboardComponent } from './wind-dashboard/wind-dashboard.component'
import { OemAlarmComponent } from './oem-alarm/oem-alarm.component'
// dashboard
const routes: Routes = [
  {
    path: 'new',
    component: oemDashboardComponent,
    data: { title: 'create', data: { permission: 'application master:create' } },
  },
  {
    path: 'ncu',
    component: OemBcuDashboardComponent,
  },
  {
    path: 'ncu/:type',
    component: OemBcuDashboardComponent,
  },
  {
    path: 'bcu',
    component: BcuComponent,
  },
  {
    path: 'bcu/:type',
    component: BcuComponent,
  },
  {
    path: 'wind',
    component: WindDashboardComponent,
  },
  {
    path: 'alarm',
    component: OemAlarmComponent,
  },
  
  {
    path: 'scheduleing',
    component: ScheduleingComponent,
  },
  {
    path: 'fullYearScheduleing',
    component: FullYearschedulingComponent,
  },

]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class OemRouterModule { }