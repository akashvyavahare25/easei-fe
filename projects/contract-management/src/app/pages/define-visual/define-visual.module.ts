import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefineVisualRoutingModule } from './define-visual-routing.module';
import { CreateVisualComponent } from './create-visual/create-visual.component';
import { AllVisualComponent } from './all-visual/all-visual.component';
import { SharedModule } from '../../../../src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  declarations: [CreateVisualComponent, AllVisualComponent],
  imports: [
    SharedModule,
    DefineVisualRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PlotlyModule,
    AgGridModule.withComponents([])
  ]
})
export class DefineVisualModule { }
