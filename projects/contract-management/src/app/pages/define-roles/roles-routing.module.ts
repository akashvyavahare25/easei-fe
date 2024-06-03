import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Screenguard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { AllRolesComponent } from './all-roles/all-roles.component'

// dashboard
const routes: Routes = [
    {
        path: 'create',
        component: CreateRolesComponent,
        canActivate: [AuthGuard],
        data: { title: 'create', permission: 'define master:create' },
      },
      {
        path: 'all',
        component: AllRolesComponent,
        canActivate: [AuthGuard],
        data: { title: 'all', permission: 'define master:create' },
      },
      {
        path: 'edit/:id',
        component: CreateRolesComponent,
        canActivate: [AuthGuard],
        data: { title: 'edit', permission: 'define master:create' },
      }
  
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class RolesRouterModule { }
