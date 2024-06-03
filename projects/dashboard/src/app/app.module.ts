import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import{CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ToggleDirective } from './dashboard/sidebar/toggle.directive';
// import { HomeComponent, DialogContentExampleDialog } from './page/home/home.component';
import { TableComponent } from './page/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReportComponent } from './page/report/report.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgApexchartsModule } from "ng-apexcharts";
import { HighchartsChartModule } from 'highcharts-angular';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
// import { ForgetPasswordComponent } from './page/home/forget-password/forget-password.component';
// import { ToastrModule } from 'ngx-toastr'; 
// import { PlantDashboardModule } from './page/home/plant-dashboard/plant-dashboard-module'; 
 import { PlantServiceService } from './services/plants/plant-service.service';
 import { OemService } from './services/oem/oem-service.service';
 import { OemNcuService } from './services/oem/oem-ncu.service';
// import { OtpVerificationComponent } from './page/otp-verification/otp-verification.component';
// import { AuthModule } from './page/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { reducers ,metaReducers} from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { ScrollingModule } from '@angular/cdk/scrolling'
// import { DragDropModule } from '@angular/cdk/drag-drop'; 
// import {AdminModule} from './page/adminpages/admin-module'
 import { OembcuService } from './services/oem/oem-bcu.serivce';
 import { ForgetPasswordService } from './services/forget-password/forget-password.service';
import { HelpComponent } from './page/help/help.component';
import { SettingComponent } from './page/setting/setting.component';
import { SharedModule } from './shared.module';
import { ForgetPasswordComponent } from './page/forget-password/forget-password.component';
import { OtpVerificationComponent } from './page/otp-verification/otp-verification.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './page/auth/auth.module';
import { HelppopupComponent } from './page/helppopup/helppopup.component';
@NgModule({
  declarations: [
    AppComponent, 
    TableComponent, 
    ReportComponent, 
    ForgetPasswordComponent, 
    OtpVerificationComponent,
    HelpComponent,
    SettingComponent,
    HelppopupComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    FormsModule,
    CommonModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot( {timeOut: 10000,closeButton:true}),
    NgApexchartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    HighchartsChartModule,
    HttpClientModule,
    // PlantDashboardModule,
    //  DragDropModule,
    // ScrollingModule,
    // AdminModule,
    SharedModule,
    // // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    DataService,PlantServiceService,OemService,OemNcuService,OembcuService,ForgetPasswordService,
    ToggleDirective, 
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class App2SharedModule{
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: [// auth services
        DataService
         
      ]
    }
  }
}
