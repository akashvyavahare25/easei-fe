import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common' 
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms' 
import { HighchartsChartModule } from 'highcharts-angular'; 
import { SharedModule } from '../../../../src/app/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts' 
import { AdminRoutingModule } from './admin-routing-module';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [ UserManagementComponent, UserListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,    
    ReactiveFormsModule,
    HighchartsChartModule,
     NgApexchartsModule,
     AdminRoutingModule,
  ]
})
export class AdminModule { }

