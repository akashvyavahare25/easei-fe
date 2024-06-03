import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LayoutsModule } from 'projects/contract-management/src/app/layouts/layouts.module';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {path : 'create', component : RoleComponent, data: { title: 'Create User' }},/* 
  {path : 'update/:id', component : UserComponent,  data: { title: 'Update User' }},*/
  {path : 'list', component : RoleListComponent,  data: { title: 'User List' }}, 
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class RoleManagementRoutingModule { }
