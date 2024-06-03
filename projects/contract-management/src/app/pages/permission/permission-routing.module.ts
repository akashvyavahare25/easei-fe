import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../layouts/layouts.module';
import { PermissionPageComponent } from './permission-page/permission-page.component';

const routes: Routes = [
  {
    path: 'create',
    component: PermissionPageComponent,
    data: { title: 'permission' }
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class PermissionRoutingModule { }
