import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OemRouterModule } from './oem-routing.module'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import {oemDashboardComponent} from './oem-dashboard/oem-dashboard.component'  
import { HighchartsChartModule } from 'highcharts-angular';
import { OemBcuDashboardComponent } from './oem-ncu-dashboard/oem-ncu-dashboard.component';
import { SharedModule } from '../../../../src/app/shared.module'
import { NgApexchartsModule } from 'ng-apexcharts';
import { BcuComponent } from './bcu/bcu.component';
import { WindDashboardComponent } from './wind-dashboard/wind-dashboard.component'
import { AbortDialogComponent } from './abort-dialog/abort-dialog.component';
import { ConfirmAbortComponent } from './confirm-abort/confirm-abort.component'
import { PlantDashboardModule } from '../plant-dashboard/plant-dashboard-module'
import { ScheduleingComponent } from './scheduleing/scheduleing.component';
import { CalendarPopupComponent } from './calendar-popup/calendar-popup.component';
import { FullYearschedulingComponent } from './full-yearscheduling/full-yearscheduling.component';
import { OemAlarmComponent } from './oem-alarm/oem-alarm.component'; 

@NgModule({
  declarations: [oemDashboardComponent, OemBcuDashboardComponent,AbortDialogComponent,ConfirmAbortComponent, BcuComponent,ScheduleingComponent, FullYearschedulingComponent,WindDashboardComponent , CalendarPopupComponent, OemAlarmComponent],
  imports: [
    CommonModule,
    SharedModule,
    OemRouterModule,
    FormsModule,    
    ReactiveFormsModule,
    HighchartsChartModule,
     NgApexchartsModule, 
     PlantDashboardModule,
  ],
  bootstrap: [  ],
  providers: []
})
export class OemModule { }