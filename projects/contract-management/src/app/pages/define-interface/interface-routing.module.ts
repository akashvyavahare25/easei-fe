import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { AllInterfaceComponent } from './all-interface/all-interface.component'
import { CreateInterfaceComponent } from './create-interface/create-interface.component'

// dashboard
const routes: Routes = [
  {
    path: 'create',
    component: CreateInterfaceComponent,
    canActivate: [AuthGuard],
    data: { title: 'create', permission: 'apiinterface:create' },
  },
  {
    path: 'all',
    component: AllInterfaceComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: 'apiinterface:all' },
  },
  {
    path: 'edit/:id',
    component: CreateInterfaceComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit', permission: 'apiinterface:edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class InterfaceRouterModule { }
