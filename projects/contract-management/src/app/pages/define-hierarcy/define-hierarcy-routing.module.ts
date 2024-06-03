import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { CreateHierarcyComponent } from './create-hierarcy/create-hierarcy.component'
import { AllHierarcyComponent } from './all-hierarcy/all-hierarcy.component'

// dashboard
const routes: Routes = [
  {
    path: 'all',
    component: AllHierarcyComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: '-' },
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateHierarcyComponent,
    data: { title: 'create', permission: '-' },
  },
  {
    path: 'edit/:id',
    component: CreateHierarcyComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit'},}
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class HierarcyRouterModule { }
