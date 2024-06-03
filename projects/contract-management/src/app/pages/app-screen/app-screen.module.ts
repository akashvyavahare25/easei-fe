import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
import { AppScreenRouterModule } from './app-screen-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { CreateAppScreenComponent } from './create-app-screen/create-app-screen.component';
import { AllAppScreenComponent } from './all-app-screen/all-app-screen.component';
import { ReportAppScreenComponent } from './report-app-screen/report-app-screen.component';
import { DashboardsComponent } from './dashboards/dashboards.component'
import { PlotlyModule } from 'angular-plotly.js';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  declarations: [CreateAppScreenComponent, AllAppScreenComponent, ReportAppScreenComponent, DashboardsComponent, AppDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppScreenRouterModule,
    HighchartsChartModule,
    FormsModule,
    FormioModule,
    GridsterModule,
    ReactiveFormsModule,
    PlotlyModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe]
})
export class AppScreenModule { }
