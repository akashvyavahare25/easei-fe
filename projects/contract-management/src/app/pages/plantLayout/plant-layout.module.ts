import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { plantLayoutRoute } from './plantLayout-routing';
import { PlantLayoutComponent } from './plant-layout/plant-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule, NzSelectModule, NzSwitchModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared.module';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [PlantLayoutComponent],
  imports: [
    CommonModule,
    plantLayoutRoute,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    SharedModule,
    AgGridModule.withComponents([]),
  ]
})
export class PlantLayoutModule { }
 