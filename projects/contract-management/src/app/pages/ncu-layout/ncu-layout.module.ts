import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NcuLayoutComponent } from './ncu-layout/ncu-layout.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule, NzSelectModule, NzSwitchModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ncuLayoutRoute } from './ncuLayout-routing';


@NgModule({
  declarations: [NcuLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    SharedModule,
    AgGridModule.withComponents([]),
    ncuLayoutRoute
  ]
})
export class NcuLayoutModule { }
