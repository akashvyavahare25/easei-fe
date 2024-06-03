import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module';

const routes: Routes = [
  {path : 'create', component : UserComponent, data: { title: 'Create User' }},
  {path : 'update/:id', component : UserComponent,  data: { title: 'Update User' }},
  {path : 'view/:id', component : UserComponent,  data: { title: 'View User' }},
  /*   {path : 'update/:id/:firstName/:lastName/:role/:ownerName/:email/:password', component : UserComponent,  data: { title: 'Update User' }}, */
  {path : 'list', component : UserListComponent,  data: { title: 'User List' }},
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }
