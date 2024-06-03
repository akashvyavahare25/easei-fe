import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'front',
    loadChildren: '../../projects/dashboard/src/app/app.module#App2SharedModule',
   
  },
  {
    path: 'drone',
    loadChildren:
      '../../projects/contract-management/src/app/app.module#App1SharedModule',
     
  },
  { path: '', redirectTo: 'front/auth/login', pathMatch: 'full' }

  // { path: 'app1/two', component: View2Component },
  // { path: 'app1', redirectTo: 'app1/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
