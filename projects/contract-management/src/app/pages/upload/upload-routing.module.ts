import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../layouts/layouts.module'
import { CreateUploadComponent } from './create-upload/create-upload.component';
import { AllUploadComponent } from './all-upload/all-upload.component';
const routes: Routes = [
  {
    path: 'all',
    component: AllUploadComponent,
    data: { title: 'notification' }
  },
  
  {
    path: 'create',
    component: CreateUploadComponent,
    data: { title: 'upload' }
  },
  {
    path: 'edit/:id',
    component: CreateUploadComponent,
    //canActivate: [AuthGuard],
    data: { title: 'edit'},
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class UploadRoutingModule { }
