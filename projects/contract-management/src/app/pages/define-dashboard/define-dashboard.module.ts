import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import { AllDashboardComponent } from './all-dashboard/all-dashboard.component';
import { DashboardRouterModule } from './define-dashboard-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { SharedModule } from '../../../../src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { PlotlyModule } from 'angular-plotly.js';


@NgModule({
  declarations: [CreateDashboardComponent, AllDashboardComponent],
  imports: [
    CommonModule,
    DashboardRouterModule,
    GridsterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PlotlyModule,
    AgGridModule.withComponents([])
  ]
})
export class DefineDashboardModule { }
