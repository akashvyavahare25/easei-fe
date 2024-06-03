import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common' 
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms' 
import { HighchartsChartModule} from 'highcharts-angular'; 
import { SharedModule } from '../../../../src/app/shared.module'
import { NgApexchartsModule } from 'ng-apexcharts' 
import { PortfolioRoutingModule } from './portfolio-routing-module';
import { HeatmapComponent } from './heatmap/heatmap.component'; 
import { TreemapComponent } from './treemap/treemap.component';
import { WorldmapComponent } from './worldmap/worldmap.component';
import { DialogContentExampleDialog, HomeComponent } from './home/home.component';
import { RenewSolarFormComponent } from './renewSolarForm/renewSolarForm.component';
@NgModule({
  declarations: [ HeatmapComponent,DialogContentExampleDialog,HomeComponent,RenewSolarFormComponent,TreemapComponent,WorldmapComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,    
    ReactiveFormsModule,
    HighchartsChartModule,
     NgApexchartsModule,
     PortfolioRoutingModule,
  ],
  bootstrap: [  ],
  providers: []
})
export class PortfolioModule { }

