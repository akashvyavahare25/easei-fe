import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common' 
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms' 
import { HighchartsChartModule } from 'highcharts-angular'; 
import { SharedModule } from '../../../../src/app/shared.module'
import { NgApexchartsModule } from 'ng-apexcharts'
import { AlarmComponent ,DialogContentAlaramDialog} from './alarm/alarm.component'
import { PlantServiceComponent } from './plant-service/plant-service.component'
import { PlantDashboardComponent } from './plantDashboard/plantDashboard.component'
import { ReplacementNotificationComponent } from './replacementNotification/replacementNotification.component'
import { PlantDashboardRoutingModule } from './plant-dashboard-routing'
import { Heatmap1Component } from './plantDashboard/heatmap1/heatmap1.component';
import { RaiseAlarmPreviewDialogComponent } from './raise-alarm-preview-dialog/raise-alarm-preview-dialog.component';
@NgModule({
  declarations: [RaiseAlarmPreviewDialogComponent, AlarmComponent,PlantServiceComponent,PlantDashboardComponent,ReplacementNotificationComponent,Heatmap1Component,DialogContentAlaramDialog],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,    
    ReactiveFormsModule,
    HighchartsChartModule,
     NgApexchartsModule,
     PlantDashboardRoutingModule,
  ],
  exports:[DialogContentAlaramDialog]
})
export class PlantDashboardModule { }

