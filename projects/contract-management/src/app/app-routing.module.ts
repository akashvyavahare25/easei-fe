import { Component, NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../src/app/shared.module'
import { LayoutsModule } from '../../src/app/layouts/layouts.module'
import { AppPreloader } from '../../src/app/app-routing-loader'
import { AuthGuard } from '../../src/app/components/cleanui/system/Guard/auth.guard'

// layouts & notfound
import { LayoutAuthComponent } from '../../src/app/layouts/Auth/auth.component'
import { LayoutMainComponent } from '../../src/app/layouts/Main/main.component'
import { AppComponent } from './app.component'

const routes: Routes = [
  {
    path: 'drone/home',
    redirectTo: 'home',
    data: { permission: '-' },
    pathMatch: 'full',
   
  },
  {
    path:'drone',
    component:AppComponent,
    children: [
      {
        path: '',
        component: LayoutMainComponent,
        children: [
          {
            path: 'home',
            data: { permission: '-' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/home/home.module').then(m => m.HomeModule),
          },
          {
            path: 'parameter',
            canActivate: [AuthGuard],
            data: { permission: 'parameter' },
            loadChildren: () =>
              import('../../src/app/pages/formio/formiojs.module').then(m => m.FormiojsModule),
          },
	  
      {
        path: 'file-upload',
        canActivate: [AuthGuard],
        data: { permission: 'parameter' },
        loadChildren: () =>
          import('../../src/app/pages/upload-file/upload-file.module').then(m => m.UploadFileModule),
      },
      {
        path: 'create-hierarchy',
        canActivate: [AuthGuard],
        data: { permission: 'parameter' },
        loadChildren: () =>
          import('../../src/app/pages/create-hieararchy/createhierarchy.module').then(m => m.CreateHierarchyModule),
      },
          {
            path: 'master',
            canActivate: [AuthGuard],
            data: { permission: 'define master' },
            loadChildren: () =>
              import('../../src/app/pages/master/master.module').then(m => m.MasterModule),
          },
          {
            path: 'masters',
            data: { permission: 'masters' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/master-management/master-management.module').then(m => m.MasterManagementModule),
          },
          {
            path: 'dashboard',
            data: { permission: '-' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/define-dashboard/define-dashboard.module').then(m => m.DefineDashboardModule),
          },
          {
            path: 'visual',
            data: { permission: '-' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/define-visual/define-visual.module').then(m => m.DefineVisualModule),
          },
          {
            path: 'user',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/user-management/user-management.module').then(m => m.UserManagementModule),
          },
          {
            path:'role',
            canActivate:[AuthGuard],
            loadChildren:() => 
              import('../../src/app/pages/role-management/role-management.module').then(m => m.RoleManagementModule),
          },
          {
          path:'help',
          canActivate:[AuthGuard],
          loadChildren:() => 
            import('../../src/app/pages/help/help.module').then(m => m.HelpModule),
         },
          {
            path: 'workflow',
            canActivate: [AuthGuard],
            data: { permission: '-' },
            loadChildren: () =>
              import('../../src/app/pages/workflow-history/history.module').then(m => m.HistoryModule),
          },
          {
            path: 'notification',
            canActivate: [AuthGuard],
            data: { permission: '-' },
            loadChildren: () =>
              import('../../src/app/pages/notification/notification.module').then(m => m.NotificationModule),
          },
          {
            path: 'approval',
            canActivate: [AuthGuard],
            data: { permission: '-' },
            loadChildren: () =>
              import('../../src/app/pages/approval/approval.module').then(m => m.ApprovalModule),
          },
          {
            path: 'permission',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/permission/permission.module').then(m => m.PermissionModule),
          },
          {
            path: 'screen',
            data: { permission: 'screen' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/screen/screen.module').then(m => m.ScreenModule),
          },
          {
            path: 'appmaster',
            canActivate: [AuthGuard],
            data: { permission: 'application master' },
            loadChildren: () =>
              import('../../src/app/pages/app-master/app-master.module').then(m => m.AppMasterModule),
          },
          {
            path: 'report',
            canActivate: [AuthGuard],
            //: { permission: 'application master' },
            loadChildren: () =>
              import('../../src/app/pages/report/report.module').then(m => m.ReportModule),
          },
          {
            path: 'upload',
            canActivate: [AuthGuard],
            //: { permission: 'application master' },
            loadChildren: () =>
              import('../../src/app/pages/upload/upload.module').then(m => m.UploadModule),
          },
          {
            path: 'hierarcy',
            canActivate: [AuthGuard],
            //: { permission: 'application master' },
            loadChildren: () =>
              import('../../src/app/pages/define-hierarcy/define-hierarcy.module').then(m => m.HierarcyModule),
          },
          {
            path: 'appscreen',
            loadChildren: () =>
              import('../../src/app/pages/app-screen/app-screen.module').then(m => m.AppScreenModule),
          },
          {
            path: 'job',
            data: { permission: 'job' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/define-job/job.module').then(m => m.JobModule),
          },
          {
            path: 'roles',
            data: { permission: 'roles' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/define-roles/roles.module').then(m => m.RolesModule),
          },
          {
            path: 'rules',
            data: { permission: '-' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/define-rules/rules.module').then(m => m.RulesModule),
          },
          {
            path: 'interface',
            data: { permission: 'interface' },
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/define-interface/interface.module').then(m => m.InterfaceModule),
          },
          {
            path: 'customer',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/customer/customer.module').then(m => m.CustomerModule),
          },
          {
            path: 'project',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/project/project.module').then(m => m.ProjectModule),
          },
          {
            path: 'plantLayout',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/plantLayout/plant-layout.module').then(m => m.PlantLayoutModule),
          },
          {
            path: 'masterPermission',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../../src/app/pages/master-permission/master-permission.module').then(m => m.MasterPermissionModule),
          }
        ],
      },
    ],
  },
  
  
  {
    path: 'drone/auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../src/app/pages/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  
  {
    path: 'drone/**',
    redirectTo: '/auth/404',
  },
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: false
      //preloadingStrategy: AppPreloader,
    }),
    LayoutsModule,
  ],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule { }
