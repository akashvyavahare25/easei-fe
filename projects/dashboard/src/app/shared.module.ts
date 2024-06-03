import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConstantheatmapComponent } from './constants/heatmap1/constantheatmap.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ToggleDirective } from './dashboard/sidebar/toggle.directive';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGrigPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([  
  dayGridPlugin,
  interactionPlugin
]);
const MODULES = [RouterModule,CommonModule,MatModule,FormsModule,ReactiveFormsModule,HighchartsChartModule,NgApexchartsModule,FullCalendarModule]

@NgModule({
  declarations: [ConstantheatmapComponent,SidebarComponent,ToggleDirective],
  imports: [...MODULES],
  exports: [ConstantheatmapComponent,SidebarComponent,ToggleDirective,...MODULES],
})
export class SharedModule { }
