import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'   
import { UserListComponent } from './user-list/user-list.component'
import { UserManagementComponent } from './user-management/user-management.component'

// dashboard
const routes: Routes = [
  {
    path: 'create',
    component: UserManagementComponent, 
  },
  {
    path: 'list',
    component: UserListComponent, 
  },
  {
    path: 'update/:id',
    component: UserManagementComponent, 
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AdminRoutingModule { }