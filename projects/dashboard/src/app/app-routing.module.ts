import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './page/home/home.component';
import { TableComponent } from './page/table/table.component';
//import { LoginComponent } from './page/login/login.component';
import { ReportComponent } from './page/report/report.component';


import { AppComponent } from "./app.component";
import { SharedModule } from './shared.module';
//import { LoginComponent } from './page/auth/login/login.component';
//import { AuthlayoutComponent } from './page/auth/authlayout/authlayout.component';
import { LayoutComponent } from './page/auth/layout/layout.component';
import { AuthGuard } from './page/auth/Guard/auth.guard';
import { HelpComponent } from './page/help/help.component';
import { SettingComponent } from './page/setting/setting.component';
const routes: Routes = [
 
  {
    path:'front',
    data: {
      role: ['superadmin-it','super user','portfolio','admin','oem','plant']
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path:'oem',
        canActivate: [AuthGuard],
        data: {
          role: ['admin','oem']
        },
        children: [
          {
            path: '',
            children: [
              {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: () =>
                  import('./page/oem/oem.module').then(m => m.OemModule),
              },
             
            ],
          },
        ],
      },
      {
        path:'plant', 
        canActivate: [AuthGuard],
        data: {
          role: ['admin','plant']
        },
        children:[
          {
            path:'',
            canActivate: [AuthGuard],
            loadChildren: () => import('./page/plant-dashboard/plant-dashboard-module').then(m => m.PlantDashboardModule),
          }
        ]           
      },
      {
        path:'portfolio', 
        canActivate: [AuthGuard],
        data: {
          role: ['admin','portfolio']
        },
        children:[
          {
            path:'',
            canActivate: [AuthGuard],
            loadChildren: () => import('./page/portfolio/portfolio-module').then(m => m.PortfolioModule),
          }
        ]  
              
      },
      {
        path:'user', 
        data: {
          role: ['superadmin','admin']
        },
        canActivate: [AuthGuard],
        children:[
          {
            path:'',
            loadChildren: () => import('./page/adminpages/admin-module').then(m => m.AdminModule),
          }
        ]  
              
      },
      {path: 'report', component: ReportComponent},
      {path: 'plant/report', component: ReportComponent},
      {path: 'help', component: HelpComponent},
      {path: 'setting', component: SettingComponent},
      {path: 'table', component: TableComponent},
    ]
  },
  {
    path: 'auth',  
    // component: AuthlayoutComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./page/auth/auth.module').then(m => m.AuthModule),
      }
    ]   
  },
  // {
  //   path: '**',
  //   redirectTo: '/auth/404',
  // },
];

@NgModule({
  imports: [SharedModule,RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
