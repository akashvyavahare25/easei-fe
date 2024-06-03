import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotAnalyticsComponent } from './bot-analytics/bot-analytics.component';
import { botAnalyticsRoute } from './botAnalytics-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule, NzSelectModule, NzSwitchModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared.module';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [BotAnalyticsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    SharedModule,
    AgGridModule.withComponents([]),
    botAnalyticsRoute
  ]
})
export class BotAnalyticsModule { }
