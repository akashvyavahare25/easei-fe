import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { AllMastersComponent } from './all-masters/all-masters.component'
import { CreateMasterComponent } from './create-master/create-master.component'

// dashboard
const routes: Routes = [
  {
    path: 'create',
    component: CreateMasterComponent,
    canActivate: [AuthGuard],
    data: { title: 'create', permission: 'define master:create' },
  },
  {
    path: 'all',
    component: AllMastersComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: 'define master:all' },
  },
  {
    path: 'edit/:id',
    component: CreateMasterComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit', permission: 'define master:edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class MasterRouterModule { }
