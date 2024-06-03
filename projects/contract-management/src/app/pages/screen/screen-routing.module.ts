import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { AllScreenComponent } from './all-screen/all-screen.component'
import { CreateScreenComponent } from './create-screen/create-screen.component'

// dashboard
const routes: Routes = [
  {
    path: 'create',
    component: CreateScreenComponent,
    canActivate: [AuthGuard],
    data: { title: 'create', permission: 'screen:create' },
  },
  {
    path: 'all',
    component: AllScreenComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: 'screen:all' },
  },
  {
    path: 'edit/:id',
    component: CreateScreenComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit', permission: 'screen:edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class ScreenRouterModule { }
