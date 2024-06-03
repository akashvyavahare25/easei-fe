import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { AllAppMasterComponent } from './all-app-master/all-app-master.component'
import { CreateAppMasterComponent } from './create-app-master/create-app-master.component'

// dashboard
const routes: Routes = [
  {
    path: 'create',
    component: CreateAppMasterComponent,
    data: { title: 'create', data: { permission: 'application master:create' } },
  },
  {
    path: 'all',
    component: AllAppMasterComponent,
    data: { title: 'all', data: { permission: 'application master:all' } },
  },
  {
    path: 'edit/:id',
    component: CreateAppMasterComponent,
    data: { title: 'edit', data: { permission: 'application master:edit' } },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppMasterRouterModule { }
