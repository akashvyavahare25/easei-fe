import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import {CreateCustomerComponent} from './create-customer/create-customer.component'
import { AllCustomerComponent } from './all-customer/all-customer.component'
import { AssignLogoComponent } from './assign-logo/assign-logo.component'

const routes: Routes = [
  {
    path: 'logo',
    component: AssignLogoComponent,
    canActivate: [AuthGuard],
    // data: { title: 'all', permission: 'parameter:all' },
  },
  {
    path: 'all',
    component: AllCustomerComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: 'parameter:all' },
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateCustomerComponent,
    data: { title: 'create', permission: 'parameter:create' },
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: CreateCustomerComponent,
    data: { title: 'edit', permission: 'parameter:edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class CustomerRouterModule { }
